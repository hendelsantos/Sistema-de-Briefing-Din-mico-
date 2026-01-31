import Link from "next/link";

export default function PortfolioPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-indigo-500 selection:text-white">
      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/portfolio" className="text-2xl font-bold tracking-tighter">
            Hendel<span className="text-indigo-500">Code</span>
            <span className="text-indigo-500">.</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
            <a href="#about" className="hover:text-white transition-colors">
              Sobre
            </a>
            <a href="#projects" className="hover:text-white transition-colors">
              Projetos
            </a>
            <a href="#services" className="hover:text-white transition-colors">
              Serviços
            </a>
          </div>
          <a
            href="https://wa.me/5519974212216" // Updated with user's number
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium transition-all text-sm"
          >
            Falar Comigo
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Disponível para novos projetos
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-transparent">
            Desenvolvedor Full Stack <br />
            <span className="text-indigo-500">& Blockchain</span> Expert
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Transformo ideias complexas em software de alta performance. Especialista em
            Sistemas Web, Landing Pages Premium e Soluções em Blockchain.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#projects"
              className="px-8 py-4 bg-white text-slate-950 rounded-full font-bold hover:bg-slate-200 transition-colors"
            >
              Ver Portfólio
            </a>
            <a
              href="https://github.com/hendelsantos" // TODO: Verify github
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-slate-900 border border-white/10 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Featured Project: HashDocs */}
      <section id="projects" className="py-24 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Projetos em Destaque</h2>
            <div className="h-1 w-20 bg-indigo-500 rounded-full" />
          </div>

          <div className="group relative bg-slate-950 border border-white/10 rounded-3xl overflow-hidden hover:border-indigo-500/50 transition-colors duration-500">
            <div className="grid md:grid-cols-2 gap-12 p-8 md:p-12 items-center">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-indigo-500/10 rounded-xl">
                    <svg
                      className="w-8 h-8 text-indigo-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <span className="text-indigo-400 font-mono text-sm tracking-wider uppercase">
                    Blockchain Case
                  </span>
                </div>
                <h3 className="text-3xl font-bold">HashDocs</h3>
                <p className="text-slate-400 leading-relaxed">
                  Uma plataforma inovadora para autenticação, verificação e assinatura de
                  documentos utilizando a imutabilidade da Blockchain. Garante segurança
                  jurídica, transparência e rastreabilidade total para contratos e
                  certificados.
                </p>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    Registro imutável em Blockchain
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    Verificação instantânea de autenticidade
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />
                    Zero burocracia e custos reduzidos
                  </li>
                </ul>
                <div className="pt-4">
                  <a
                    href="https://www.hashdocs.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-white font-semibold hover:text-indigo-400 transition-colors group-hover:translate-x-1 duration-300"
                  >
                    Acessar Projeto
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </a>
                </div>
              </div>

              {/* Visual Representativo (Code/Mockup abstract) */}
              <div className="relative aspect-video rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/5 p-6 flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
                <div className="text-center space-y-4 relative z-10">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600 shadow-xl shadow-indigo-500/20 mb-4">
                    <span className="text-3xl">🔗</span>
                  </div>
                  <h4 className="text-xl font-bold">Tecnologia Smart Contract</h4>
                  <div className="flex gap-2 justify-center">
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs text-slate-400 border border-white/10">Solidity</span>
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs text-slate-400 border border-white/10">Web3.js</span>
                    <span className="px-3 py-1 bg-slate-950 rounded-full text-xs text-slate-400 border border-white/10">Next.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Minhas Especialidades</h2>
            <p className="text-slate-400">Soluções completas do design ao deploy</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Sistemas Web</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Desenvolvimento de aplicações complexas, painéis administrativos e SaaS
                com React, Next.js e Node.js. Foco em performance e escalabilidade.
              </p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Landing Pages Premium</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Páginas de alta conversão com design moderno, animações fluídas e
                otimização total para SEO. Ideal para lançamentos e produtos digitais.
              </p>
            </div>

            <div className="bg-slate-900/50 p-8 rounded-2xl border border-white/5 hover:border-indigo-500/30 transition-colors">
              <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Blockchain Solutions</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Tokens, NFTs, Smart Contracts e dApps. Integração do seu negócio com a
                Web3 para garantir segurança e inovação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="py-12 border-t border-white/10 bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-2xl font-bold mb-6">Vamos construir algo incrível juntos?</h2>
          <a
            href="mailto:contato@hendelcode.com" // TODO: Email
            className="text-indigo-400 hover:text-indigo-300 transition-colors text-lg"
          >
            Entre em contato
          </a>
          <div className="mt-12 text-slate-500 text-sm">
            © {new Date().getFullYear()} HendelCode. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
