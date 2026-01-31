"use client";

import Link from "next/link";
import { FormSchema, FormAnswers } from "@/types/form";

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
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
          <div className="bg-white rounded-lg shadow p-12 text-center">
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
              <div key={submission.id} className="bg-white rounded-lg shadow p-6">
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
                  <p className="text-sm text-gray-500">
                    {new Date(submission.submittedAt).toLocaleString("pt-BR")}
                  </p>
                </div>

                <div className="space-y-4">
                  {Object.entries(submission.answers as FormAnswers).map(
                    ([questionId, answer]) => (
                      <div key={questionId}>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {getQuestionLabel(questionId)}
                        </p>
                        <p className="text-gray-900 bg-gray-50 p-3 rounded">
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
