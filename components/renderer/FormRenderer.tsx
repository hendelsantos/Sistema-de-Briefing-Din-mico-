"use client";

import { FormQuestion, FormSchema, FormAnswers } from "@/types/form";
import { useState } from "react";

interface FormRendererProps {
  schema: FormSchema;
  onSubmit: (answers: FormAnswers) => void;
  loading?: boolean;
}

export function FormRenderer({ schema, onSubmit, loading = false }: FormRendererProps) {
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    // Clear error when user starts typing
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    const newErrors: Record<string, string> = {};
    schema.forEach((question) => {
      if (question.required && !answers[question.id]) {
        newErrors[question.id] = "Este campo é obrigatório";
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit(answers);
  };

  const renderQuestion = (question: FormQuestion) => {
    const hasError = !!errors[question.id];

    switch (question.type) {
      case "text":
        return (
          <input
            type="text"
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              hasError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={question.placeholder || "Digite sua resposta..."}
          />
        );

      case "textarea":
        return (
          <textarea
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleChange(question.id, e.target.value)}
            rows={4}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              hasError ? "border-red-500" : "border-gray-300"
            }`}
            placeholder={question.placeholder || "Digite sua resposta..."}
          />
        );

      case "select":
        return (
          <select
            value={(answers[question.id] as string) || ""}
            onChange={(e) => handleChange(question.id, e.target.value)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              hasError ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Selecione uma opção...</option>
            {question.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        );

      case "radio":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleChange(question.id, e.target.value)}
                  className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      case "checkbox":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={((answers[question.id] as string[]) || []).includes(option)}
                  onChange={(e) => {
                    const currentValues = (answers[question.id] as string[]) || [];
                    const newValues = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v) => v !== option);
                    handleChange(question.id, newValues);
                  }}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(() => {
        let questionNumber = 0;
        return schema.map((question) => {
          if (question.type === "section") {
            return (
              <div key={question.id} className="pt-6 pb-2 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">{question.label}</h3>
              </div>
            );
          }

          questionNumber++;
          return (
            <div key={question.id} className="space-y-2">
              <label className="block text-sm font-medium text-gray-900">
                {questionNumber}. {question.label}
                {question.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderQuestion(question)}
              {errors[question.id] && (
                <p className="text-sm text-red-600">{errors[question.id]}</p>
              )}
            </div>
          );
        });
      })()}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
      >
        {loading ? "Enviando..." : "Enviar Respostas"}
      </button>
    </form>
  );
}
