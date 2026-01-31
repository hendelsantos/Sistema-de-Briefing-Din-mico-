"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FormRenderer } from "@/components/renderer/FormRenderer"; 
import { FormSchema } from "@/types/form";

interface Form {
  id: string;
  title: string;
  slug: string;
  description?: string;
  schema?: any;
  clientName: string | null;
  createdAt: string;
  _count: {
    submissions: number;
  };
}

export default function AdminPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewForm, setPreviewForm] = useState<Form | null>(null);

  useEffect(() => {
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await fetch("/api/forms");
      if (response.ok) {
        const data = await response.json();
        setForms(data);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este briefing? Esta ação não pode ser desfeita.")) {
      return;
    }

    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchForms();
      } else {
        alert("Erro ao excluir briefing. Verifique se existem propostas associadas.");
      }
    } catch (error) {
      alert("Erro ao excluir briefing");
    }
  };

  const copyLink = (slug: string) => {
    const link = `${window.location.origin}/b/${slug}`;
    navigator.clipboard.writeText(link);
    alert("Link copiado para a área de transferência!");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Sidebar / Modal for Preview */}
      {previewForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6 md:p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto relative transition-colors duration-300">
                <button 
                    onClick={() => setPreviewForm(null)}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 pr-8">{previewForm.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">{previewForm.description}</p>

                <div className="dark:text-white">
                    <FormRenderer 
                        schema={previewForm.schema as FormSchema}
                        onSubmit={() => alert("Isso é apenas uma visualização. Nenhuma resposta foi enviada.")}
                        loading={false}
                    />
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                    <button
                        onClick={() => setPreviewForm(null)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        Fechar Visualização
                    </button>
                </div>
            </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Painel de Briefings
          </h1>
          <div className="flex items-center gap-4">
            <Link 
                href="/" 
                target="_blank"
                className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium flex items-center gap-1"
            >
                Ver Site
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </Link>
            <ThemeToggle />
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
                Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Meus Briefings
          </h2>
          <div className="flex gap-2">
            <button
              onClick={async () => {
                if (!confirm("Isso criará o modelo 'Loja Virtual' padrão. Deseja continuar?")) return;
                try {
                  setLoading(true);
                  const res = await fetch("/api/templates/seed", { method: "POST" });
                  if (res.ok) {
                    alert("Modelo criado com sucesso!");
                    fetchForms();
                  } else {
                    throw new Error("Erro ao criar modelo");
                  }
                } catch (e) {
                  alert("Erro ao criar modelo");
                } finally {
                  setLoading(false);
                }
              }}
              className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 px-4 py-2 border border-indigo-200 dark:border-indigo-800 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/50 transition-colors"
            >
              + Gerar Modelo Loja Virtual
            </button>
            <Link
              href="/admin/novo"
              className="bg-blue-600 dark:bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              + Novo Briefing
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center transition-colors duration-300">
            <p className="text-gray-500 dark:text-gray-400">Carregando...</p>
          </div>
        ) : forms.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center transition-colors duration-300">
            <div className="text-gray-400 dark:text-gray-500 mb-4">
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              Nenhum briefing criado
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Comece criando seu primeiro briefing personalizado
            </p>
            <Link
              href="/admin/novo"
              className="inline-block bg-blue-600 dark:bg-blue-700 text-white px-6 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Criar Briefing
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden transition-colors duration-300">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Respostas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {forms.map((form) => (
                  <tr key={form.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        {form.title}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">/b/{form.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {form.clientName || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100">
                        {form._count.submissions}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      {new Date(form.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                       <button
                        onClick={() => setPreviewForm(form)} // Preview Action
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 inline-flex items-center gap-1"
                        title="Visualizar perguntas"
                      >
                        <span className="text-xl leading-none">👁️</span>
                      </button>
                      <button
                        onClick={() => copyLink(form.slug)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-900 dark:hover:text-blue-300"
                      >
                        Link
                      </button>
                      <Link
                        href={`/admin/respostas/${form.id}`}
                        className="text-green-600 dark:text-green-400 hover:text-green-900 dark:hover:text-green-300"
                      >
                        Respostas
                      </Link>
                      <button
                        onClick={async () => {
                          if (!confirm("Deseja criar um novo briefing usando este como modelo?")) return;
                          
                          try {
                            const newTitle = `${form.title} (Cópia)`;
                            const newSlug = `${form.slug}-copia-${Date.now()}`;
                            
                            const response = await fetch("/api/forms", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                title: newTitle,
                                slug: newSlug,
                                description: form.description, 
                                clientName: "", 
                                schema: form.schema, 
                              }),
                            });

                            if (response.ok) {
                              alert("Briefing duplicado com sucesso! Você pode editá-lo agora.");
                              fetchForms();
                            } else {
                              throw new Error("Erro ao duplicar");
                            }
                          } catch (error) {
                            alert("Erro ao duplicar briefing");
                          }
                        }}
                        className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300"
                        title="Usar como modelo"
                      >
                        Duplicar
                      </button>
                      <button
                        onClick={() => handleDelete(form.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        title="Excluir"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
