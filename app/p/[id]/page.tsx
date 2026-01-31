import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FormAnswers, FormSchema } from "@/types/form";
import { ThemeToggle } from "@/components/ThemeToggle";

export default async function ProposalPage({
  params,
}: {
  params: { id: string };
}) {
  const proposal = await (prisma as any).proposal.findUnique({
    where: { id: params.id },
    include: {
      submission: {
        include: {
          form: true,
        },
      },
    },
  });

  if (!proposal) {
    notFound();
  }

  const { submission } = proposal;
  const { form } = submission;
  const schema = form.schema as unknown as FormSchema;

  // Helper to get Q&A for summary (optional, maybe just show scope)
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
  
  const whatsappMessage = encodeURIComponent(
    `Olá! Recebi a proposta comercial #${proposal.id} e gostaria de aprová-la!`
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-900 font-sans selection:bg-indigo-100 selection:text-indigo-900 dark:selection:bg-indigo-900 dark:selection:text-indigo-100 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-slate-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
             Hendel<span className="text-indigo-600 dark:text-indigo-400">Code</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-slate-500 dark:text-gray-400 hidden sm:block">
              Proposta Comercial #{proposal.id.slice(-6)}
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        
        {/* Hero / Status */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-slate-100 dark:border-gray-700 transition-colors duration-300">
          <div className="bg-slate-900 dark:bg-black px-8 py-10 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-indigo-500/10" />
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 relative z-10">
              Proposta de Desenvolvimento
            </h1>
            <p className="text-slate-400 text-lg relative z-10">
              Preparada especialmente para {form.clientName || "Cliente"}
            </p>
          </div>
          
          <div className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Investimento Total
                </h3>
                <div className="text-4xl font-bold text-slate-900 dark:text-white">
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(proposal.price))}
                </div>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-2">
                  Pagamento via PIX, Boleto ou Cartão (até 12x)
                </p>
              </div>
              
              <div>
                 <h3 className="text-sm font-semibold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                  Prazo Estimado
                </h3>
                <div className="text-4xl font-bold text-slate-900 dark:text-white">
                  {proposal.deadline}
                </div>
                <p className="text-sm text-slate-500 dark:text-gray-400 mt-2">
                  Contados a partir do início do desenvolvimento
                </p>
              </div>
            </div>

            <div className="mt-12 pt-12 border-t border-slate-100 dark:border-gray-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Escopo do Projeto
              </h3>
              <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {proposal.scope || "Conforme detalhado no briefing enviado."}
              </div>
            </div>
            
            <div className="mt-12 pt-12 border-t border-slate-100 dark:border-gray-700 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <p className="font-medium text-slate-900 dark:text-white">Dúvidas?</p>
                <p className="text-slate-500 dark:text-gray-400 text-sm">Entre em contato direto comigo.</p>
              </div>
              <a
                href={`https://wa.me/5519974212216?text=${whatsappMessage}`}
                target="_blank"
                className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white text-lg font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 w-full md:w-auto text-center flex items-center justify-center gap-2"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
                Aprovar Proposta
              </a>
            </div>
          </div>
        </div>

        {/* Briefing Context Accordion */}
        <details className="bg-white dark:bg-gray-800 rounded-lg border border-slate-200 dark:border-gray-700 shadow-sm overflow-hidden group transition-colors duration-300">
          <summary className="px-6 py-4 cursor-pointer font-medium text-slate-700 dark:text-gray-300 flex justify-between items-center group-open:bg-slate-50 dark:group-open:bg-gray-700/50 transition-colors">
            Ver detalhes do Briefing enviado
            <svg className="w-5 h-5 text-slate-400 dark:text-gray-500 transform group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="px-6 py-6 border-t border-slate-200 dark:border-gray-700">
            <div className="space-y-6">
              {Object.entries(submission.answers as FormAnswers).map(
                ([questionId, answer]) => (
                  <div key={questionId}>
                    <p className="text-xs font-semibold text-indigo-500 dark:text-indigo-400 uppercase tracking-wider mb-1">
                      {getQuestionLabel(questionId)}
                    </p>
                    <p className="text-slate-700 dark:text-gray-300 bg-slate-50 dark:bg-gray-700/50 p-3 rounded-lg text-sm border border-slate-100 dark:border-gray-600">
                      {formatAnswer(answer)}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </details>
        
        <div className="mt-12 text-center text-slate-400 dark:text-gray-500 text-sm">
           © {new Date().getFullYear()} HendelCode. Todos os direitos reservados.
        </div>
      </main>
    </div>
  );
}
