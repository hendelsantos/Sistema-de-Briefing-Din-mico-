"use client";

import { useState } from "react";
import { FormRenderer } from "@/components/renderer/FormRenderer";
import { FormSchema, FormAnswers } from "@/types/form";

import { ThemeToggle } from "@/components/ThemeToggle";

interface FormClientProps {
  form: {
    id: string;
    title: string;
    description: string | null;
    schema: any;
  };
}

export function FormClient({ form }: FormClientProps) {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [clientEmail, setClientEmail] = useState("");

  const handleSubmit = async (answers: FormAnswers) => {
    setLoading(true);

    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: form.id,
          clientEmail: clientEmail || undefined,
          answers,
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao enviar respostas");
      }

      setSubmitted(true);
    } catch (error) {
      alert("Erro ao enviar o formulário. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 p-4 transition-colors duration-300">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 max-w-md w-full text-center mb-6 transition-colors duration-300">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600 dark:text-green-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Briefing Enviado!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Obrigado por preencher o briefing. Suas respostas foram enviadas com sucesso.
          </p>
        </div>

        {/* CTA Portfolio */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden group transition-colors duration-300">
          <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
          <p className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-2">Desenvolvedor do Sistema</p>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Impressionado com a fluidez?</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed">
            Eu crio sistemas web complexos e soluções em blockchain com foco em performance e experiência do usuário.
          </p>
          <a 
            href="/portfolio" 
            target="_blank"
            className="inline-flex items-center justify-center w-full gap-2 bg-slate-900 dark:bg-slate-700 text-white py-3 px-6 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-all transform hover:-translate-y-1 font-medium shadow-lg hover:shadow-xl"
          >
            Conhecer Meu Trabalho
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 py-12 px-4 transition-colors duration-300">
      <div className="max-w-3xl mx-auto relative">
        {/* Toggle Theme Absolute Position for public form */}
        <div className="absolute top-0 right-0 -mt-8 px-2 md:px-0">
             <ThemeToggle />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 md:p-12 transition-colors duration-300">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {form.title}
            </h1>
            {form.description && (
              <p className="text-gray-600 dark:text-gray-400">{form.description}</p>
            )}
          </div>

          {/* Optional Email Field */}
          <div className="mb-8 pb-8 border-b border-gray-200 dark:border-gray-700">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email (opcional)
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 transition-colors"
              placeholder="seu@email.com"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Deixe seu email para receber uma cópia das respostas
            </p>
          </div>

          {/* Form */}
          <div className="dark:text-white">
            <FormRenderer
                schema={form.schema as FormSchema}
                onSubmit={handleSubmit}
                loading={loading}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600 dark:text-gray-400">
          <a href="/portfolio" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Feito por HendelCode
          </a>
        </div>
      </div>
    </div>
  );
}
