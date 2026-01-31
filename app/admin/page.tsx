"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    if (!confirm("Tem certeza que deseja excluir este briefing?")) {
      return;
    }

    try {
      const response = await fetch(`/api/forms/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchForms();
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            Painel de Briefings
          </h1>
          <div className="flex items-center gap-4">
            <Link 
                href="/" 
                target="_blank"
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
            >
                Ver Site
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </Link>
            <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900"
            >
                Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
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
              className="text-sm text-indigo-600 hover:text-indigo-800 px-4 py-2 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors"
            >
              + Gerar Modelo Loja Virtual
            </button>
            <Link
              href="/admin/novo"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              + Novo Briefing
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500">Carregando...</p>
          </div>
        ) : forms.length === 0 ? (
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
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum briefing criado
            </h3>
            <p className="text-gray-500 mb-4">
              Comece criando seu primeiro briefing personalizado
            </p>
            <Link
              href="/admin/novo"
              className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Criar Briefing
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Título
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Respostas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {forms.map((form) => (
                  <tr key={form.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {form.title}
                      </div>
                      <div className="text-sm text-gray-500">/b/{form.slug}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {form.clientName || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {form._count.submissions}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(form.createdAt).toLocaleDateString("pt-BR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <button
                        onClick={() => copyLink(form.slug)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        Copiar Link
                      </button>
                      <Link
                        href={`/admin/respostas/${form.id}`}
                        className="text-green-600 hover:text-green-900"
                      >
                        Ver Respostas
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
                                description: form.description, // Reusing description
                                clientName: "", // Clear client name
                                schema: form.schema, // Copy schema (The Template)
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
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Usar como modelo"
                      >
                        Duplicar
                      </button>
                      <button
                        onClick={() => handleDelete(form.id)}
                        className="text-red-600 hover:text-red-900"
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

