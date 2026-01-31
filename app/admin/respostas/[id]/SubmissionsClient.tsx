"use client";

import Link from "next/link";
import { FormSchema, FormAnswers } from "@/types/form";
import { useState } from "react";

interface SubmissionsClientProps {
  form: {
    id: string;
    title: string;
    clientName: string | null;
    schema: any;
    submissions: Array<{
      id: string;
      clientEmail: string | null;
      answers: any;
      submittedAt: Date;
      proposal?: { id: string; price: number; deadline: string; status: string };
    }>;
  };
}

export function SubmissionsClient({ form }: SubmissionsClientProps) {
  const schema = form.schema as FormSchema;

  const getQuestionLabel = (questionId: string) => {
    const question = schema.find((q) => q.id === questionId);
    return question?.label || questionId;
  };

  const formatAnswer = (value: any) => {
    if (Array.isArray(value)) {
      return value.join(", ");
    }
    if (typeof value === "boolean") {
      return value ? "Sim" : "Não";
    }
    return value || "-";
  };

  const handlePrint = () => {
    window.print();
  };

  const handleGeneratePrompt = (submission: any) => {
    let prompt = `Atue como um Desenvolvedor Senior. Preciso criar um projeto com base nas seguintes respostas do cliente "${form.clientName || 'Cliente'}":\n\n`;
    
    Object.entries(submission.answers as FormAnswers).forEach(([questionId, answer]) => {
      const label = getQuestionLabel(questionId);
      const value = formatAnswer(answer);
      prompt += `**${label}**: ${value}\n`;
    });

    prompt += `\nCom base nisso, crie:\n1. A Stack Tecnológica ideal.\n2. A Arquitetura do Banco de Dados.\n3. O Passo a passo de desenvolvimento.`;

    navigator.clipboard.writeText(prompt);
    alert("Prompt copiado para a área de transferência! Cole no ChatGPT/Claude.");
  };

  const [proposalModal, setProposalModal] = useState<{ open: boolean; submissionId: string; existingProposal?: any } | null>(null);
  const [proposalPrice, setProposalPrice] = useState("");
  const [proposalDeadline, setProposalDeadline] = useState("");

  const handleCreateProposal = async () => {
    if (!proposalModal) return;

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId: proposalModal.submissionId,
          price: parseFloat(proposalPrice),
          deadline: proposalDeadline,
          scope: "Escopo baseado no briefing enviado.",
        }),
      });

      if (response.ok) {
        const proposal = await response.json();
        alert(`Proposta criada com sucesso! Link: /p/${proposal.id}`);
        setProposalModal(null);
        window.location.reload(); 
      } else {
        throw new Error("Erro ao criar proposta");
      }
    } catch (error) {
      alert("Erro ao salvar proposta");
    }
  };

  const openProposalModal = (submission: any) => {
    setProposalModal({
      open: true,
      submissionId: submission.id,
      existingProposal: submission.proposal,
    });
    if (submission.proposal) {
      setProposalPrice(submission.proposal.price || "");
      setProposalDeadline(submission.proposal.deadline || "");
    } else {
      setProposalPrice("");
      setProposalDeadline("");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 print:bg-white">
      <style jsx global>{`
        @media print {
          nav, header, button, a {
            display: none !important;
          }
          body {
            background: white;
          }
          .print-content {
            display: block !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* Proposal Modal */}
      {proposalModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 no-print">
          <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Gerar Proposta Comercial</h3>
            <p className="text-sm text-gray-500 mb-6">
              Isso criará um link único com a proposta para o cliente.
            </p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Valor (R$)</label>
                <input
                  type="number"
                  value={proposalPrice}
                  onChange={(e) => setProposalPrice(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ex: 5000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prazo de Entrega</label>
                <input
                  type="text"
                  value={proposalDeadline}
                  onChange={(e) => setProposalDeadline(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Ex: 15 dias úteis"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <button
                onClick={() => setProposalModal(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProposal}
                className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700"
              >
                {proposalModal.existingProposal ? "Atualizar Proposta" : "Gerar Link da Proposta"}
              </button>
            </div>
            
            {proposalModal.existingProposal && (
               <div className="mt-4 pt-4 border-t text-center">
                 <a 
                   href={`/p/${proposalModal.existingProposal.id}`} 
                   target="_blank"
                   className="text-blue-600 hover:underline text-sm font-medium"
                 >
                   Ver Proposta Criada ↗
                 </a>
               </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href="/admin"
                className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
              >
                ← Voltar para Dashboard
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">
                Respostas: {form.title}
              </h1>
              {form.clientName && (
                <p className="text-sm text-gray-600 mt-1">
                  Cliente: {form.clientName}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">
                Total de respostas
              </p>
              <p className="text-3xl font-bold text-blue-600">
                {form.submissions.length}
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {form.submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center no-print">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhuma resposta ainda
            </h3>
            <p className="text-gray-500">
              Compartilhe o link do briefing com seu cliente para receber respostas
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {form.submissions.map((submission, index) => (
              <div key={submission.id} className="bg-white rounded-lg shadow p-6 print:shadow-none print:border print:border-gray-300">
                <div className="flex justify-between items-start mb-4 pb-4 border-b border-gray-200">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Resposta #{form.submissions.length - index}
                    </h3>
                    {submission.clientEmail && (
                      <p className="text-sm text-gray-600 mt-1">
                        Email: {submission.clientEmail}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 no-print">
                    <p className="text-sm text-gray-500 mr-4">
                      {new Date(submission.submittedAt).toLocaleString("pt-BR")}
                    </p>
                    <button
                      onClick={() => openProposalModal(submission)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors flex items-center gap-1 ${
                        submission.proposal 
                          ? "bg-green-100 text-green-700 hover:bg-green-200" 
                          : "bg-emerald-600 text-white hover:bg-emerald-700"
                      }`}
                      title={submission.proposal ? "Editar Proposta" : "Criar Proposta"}
                    >
                      <span className="text-lg">💰</span>
                      {submission.proposal ? "Ver Proposta" : "Criar Proposta"}
                    </button>
                    <button
                      onClick={() => handleGeneratePrompt(submission)}
                      className="px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200 transition-colors flex items-center gap-1"
                      title="Gerar prompt para ChatGPT"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Prompt IA
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors flex items-center gap-1"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                      </svg>
                      PDF / Imprimir
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(submission.answers as FormAnswers).map(
                    ([questionId, answer]) => (
                      <div key={questionId} className="break-inside-avoid">
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {getQuestionLabel(questionId)}
                        </p>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded print:border print:border-gray-100">
                          {formatAnswer(answer)}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
