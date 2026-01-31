"use client";

import { useState } from "react";
import { FormRenderer } from "@/components/renderer/FormRenderer";
import { FormSchema, FormAnswers } from "@/types/form";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="bg-white rounded-lg shadow-lg p-12 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-green-600"
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Briefing Enviado!
          </h2>
          <p className="text-gray-600">
            Obrigado por preencher o briefing. Suas respostas foram enviadas com sucesso.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {form.title}
            </h1>
            {form.description && (
              <p className="text-gray-600">{form.description}</p>
            )}
          </div>

          {/* Optional Email Field */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email (opcional)
            </label>
            <input
              type="email"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="seu@email.com"
            />
            <p className="text-xs text-gray-500 mt-1">
              Deixe seu email para receber uma cópia das respostas
            </p>
          </div>

          {/* Form */}
          <FormRenderer
            schema={form.schema as FormSchema}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-sm text-gray-600">
          <a href="/portfolio" target="_blank" className="hover:text-blue-600 transition-colors">
            Feito por HendelCode
          </a>
        </div>
      </div>
    </div>
  );
}
