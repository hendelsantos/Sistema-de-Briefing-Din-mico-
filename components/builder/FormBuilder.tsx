"use client";

import { useState } from "react";
import { FormQuestion, FormSchema } from "@/types/form";
import { QuestionEditor } from "./QuestionEditor";

interface FormBuilderProps {
  initialSchema?: FormSchema;
  onChange: (schema: FormSchema) => void;
}

export function FormBuilder({ initialSchema = [], onChange }: FormBuilderProps) {
  const [schema, setSchema] = useState<FormSchema>(initialSchema);

  const addQuestion = () => {
    const newQuestion: FormQuestion = {
      id: `q${Date.now()}`,
      type: "text",
      label: "Nova Pergunta",
      required: false,
    };
    const newSchema = [...schema, newQuestion];
    setSchema(newSchema);
    onChange(newSchema);
  };

  const updateQuestion = (index: number, question: FormQuestion) => {
    const newSchema = [...schema];
    newSchema[index] = question;
    setSchema(newSchema);
    onChange(newSchema);
  };

  const removeQuestion = (index: number) => {
    const newSchema = schema.filter((_, i) => i !== index);
    setSchema(newSchema);
    onChange(newSchema);
  };

  const moveQuestion = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === schema.length - 1)
    ) {
      return;
    }

    const newSchema = [...schema];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    [newSchema[index], newSchema[targetIndex]] = [newSchema[targetIndex], newSchema[index]];
    setSchema(newSchema);
    onChange(newSchema);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">
          Perguntas do Briefing
        </h3>
        <button
          type="button"
          onClick={addQuestion}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          + Adicionar Pergunta
        </button>
      </div>

      {schema.length === 0 ? (
        <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
          <p className="text-gray-500 mb-4">
            Nenhuma pergunta adicionada ainda
          </p>
          <button
            type="button"
            onClick={addQuestion}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Adicionar Primeira Pergunta
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {schema.map((question, index) => (
            <div key={question.id} className="relative">
              <div className="absolute -left-12 top-4 flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => moveQuestion(index, "up")}
                  disabled={index === 0}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Mover para cima"
                >
                  ▲
                </button>
                <button
                  type="button"
                  onClick={() => moveQuestion(index, "down")}
                  disabled={index === schema.length - 1}
                  className="text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Mover para baixo"
                >
                  ▼
                </button>
              </div>
              <QuestionEditor
                question={question}
                onChange={(q) => updateQuestion(index, q)}
                onRemove={() => removeQuestion(index)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
