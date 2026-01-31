"use client";

import { useState } from "react";
import { FormQuestion, QuestionType } from "@/types/form";

interface QuestionEditorProps {
  question: FormQuestion;
  onChange: (question: FormQuestion) => void;
  onRemove: () => void;
}

export function QuestionEditor({ question, onChange, onRemove }: QuestionEditorProps) {
  const handleTypeChange = (type: QuestionType) => {
    onChange({
      ...question,
      type,
      options: type === "select" || type === "checkbox" || type === "radio" ? ["Opção 1"] : undefined,
    });
  };

  const handleAddOption = () => {
    const newOptions = [...(question.options || []), `Opção ${(question.options?.length || 0) + 1}`];
    onChange({ ...question, options: newOptions });
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = question.options?.filter((_, i) => i !== index);
    onChange({ ...question, options: newOptions });
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onChange({ ...question, options: newOptions });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1 space-y-3">
          {/* Question Label */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pergunta
            </label>
            <input
              type="text"
              value={question.label}
              onChange={(e) => onChange({ ...question, label: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite a pergunta..."
            />
          </div>

          {/* Question Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Resposta
            </label>
            <select
              value={question.type}
              onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="text">Texto Curto</option>
              <option value="textarea">Texto Longo</option>
              <option value="select">Seleção (Dropdown)</option>
              <option value="checkbox">Múltipla Escolha</option>
              <option value="radio">Escolha Única</option>
            </select>
          </div>

          {/* Options for select/checkbox/radio */}
          {(question.type === "select" || question.type === "checkbox" || question.type === "radio") && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Opções
              </label>
              <div className="space-y-2">
                {question.options?.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm"
                      placeholder={`Opção ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  + Adicionar Opção
                </button>
              </div>
            </div>
          )}

          {/* Required Toggle */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id={`required-${question.id}`}
              checked={question.required}
              onChange={(e) => onChange({ ...question, required: e.target.checked })}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor={`required-${question.id}`} className="ml-2 text-sm text-gray-700">
              Campo obrigatório
            </label>
          </div>
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={onRemove}
          className="ml-4 text-gray-400 hover:text-red-600"
          title="Remover pergunta"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
}
