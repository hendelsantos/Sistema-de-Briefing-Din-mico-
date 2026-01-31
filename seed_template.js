const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const lojaVirtualSchema = [
  // 1. Informações gerais
  {
    id: "sec_1",
    type: "section",
    label: "📌 1. Informações gerais do negócio",
    required: false
  },
  {
    id: "q1_1",
    type: "text",
    label: "Qual é o nome da empresa/marca?",
    required: true
  },
  {
    id: "q1_2",
    type: "radio",
    label: "A empresa já está formalizada (CNPJ) ou é pessoa física?",
    options: ["Formalizada (CNPJ)", "Pessoa Física", "Em processo de formalização"],
    required: true
  },
  {
    id: "q1_3",
    type: "text",
    label: "Segmento/nicho do negócio?",
    placeholder: "Ex: Moda, Eletrônicos, Alimentação...",
    required: true
  },
  {
    id: "q1_4",
    type: "radio",
    label: "Já existe alguma loja online ou será a primeira?",
    options: ["Já existe (Redesign/Migração)", "Será a primeira loja"],
    required: true
  },
  {
    id: "q1_5",
    type: "textarea",
    label: "Quem é o público-alvo? (idade, perfil, B2B ou B2C)",
    required: true
  },

  // 2. Produtos e vendas
  {
    id: "sec_2",
    type: "section",
    label: "🛒 2. Produtos e vendas",
    required: false
  },
  {
    id: "q2_1",
    type: "checkbox", // Pode ser mais de um
    label: "O que será vendido?",
    options: ["Produtos Físicos", "Produtos Digitais (E-book, Cursos)", "Serviços", "Assinaturas"],
    required: true
  },
  {
    id: "q2_2",
    type: "text",
    label: "Quantos produtos pretende lançar inicialmente?",
    required: false
  },
  {
    id: "q2_3",
    type: "radio",
    label: "Existe variação de produtos? (tamanho, cor, modelo, etc.)",
    options: ["Sim", "Não"],
    required: true
  },
  {
    id: "q2_4",
    type: "radio",
    label: "Os produtos são próprios ou de terceiros?",
    options: ["Próprios", "Revenda", "Dropshipping"],
    required: true
  },
  {
    id: "q2_6",
    type: "radio",
    label: "Pretende vender para todo o Brasil ou também internacional?",
    options: ["Apenas Brasil", "Brasil e Exterior", "Apenas Regional/Local"],
    required: true
  },
  {
    id: "q2_7",
    type: "radio",
    label: "Precisa de cálculo de frete automático? (Correios, JadLog, etc)",
    options: ["Sim", "Não (Frete fixo ou a combinar)"],
    required: true
  },

  // 3. Pagamentos e checkout
  {
    id: "sec_3",
    type: "section",
    label: "💳 3. Pagamentos e checkout",
    required: false
  },
  {
    id: "q3_1",
    type: "checkbox",
    label: "Quais formas de pagamento deseja receber?",
    options: ["Cartão de Crédito", "Pix", "Boleto", "Na entrega"],
    required: true
  },
  {
    id: "q3_2",
    type: "text",
    label: "Já possui conta em algum gateway de pagamento? (ex: Mercado Pago, PagSeguro, Stripe)",
    placeholder: "Se sim, qual?",
    required: false
  },
  {
    id: "q3_3",
    type: "radio",
    label: "Precisa de checkout transparente? (Pagamento sem sair do site)",
    options: ["Sim", "Não (Redirecionar para gateway)", "Não sei o que é"],
    required: true
  },
  {
    id: "q3_4",
    type: "radio",
    label: "Emissão de nota fiscal automática é necessária?",
    options: ["Sim", "Não, farei manual"],
    required: true
  },

  // 4. Domínio, hospedagem e infraestrutura
  {
    id: "sec_4",
    type: "section",
    label: "🌐 4. Domínio e Infraestrutura",
    required: false
  },
  {
    id: "q4_1",
    type: "radio",
    label: "Já possui domínio? (ex: nomedaloja.com.br)",
    options: ["Sim", "Não"],
    required: true
  },
  {
    id: "q4_2",
    type: "radio",
    label: "Já possui hospedagem?",
    options: ["Sim", "Não"],
    required: true
  },
  {
    id: "q4_3",
    type: "radio",
    label: "Possui e-mail profissional? (ex: contato@suamarca.com)",
    options: ["Sim", "Não, preciso criar"],
    required: true
  },

  // 5. Design e identidade visual
  {
    id: "sec_5",
    type: "section",
    label: "🎨 5. Design e identidade visual",
    required: false
  },
  {
    id: "q5_1",
    type: "radio",
    label: "Já possui logomarca?",
    options: ["Sim", "Não"],
    required: true
  },
  {
    id: "q5_2",
    type: "radio",
    label: "Possui identidade visual definida? (cores, fontes, manual da marca)",
    options: ["Sim", "Não"],
    required: true
  },
  {
    id: "q5_3",
    type: "textarea",
    label: "Tem referências de sites que gosta? (Cole os links aqui)",
    required: false
  },
  {
    id: "q5_4",
    type: "radio",
    label: "Já possui fotos profissionais dos produtos?",
    options: ["Sim", "Não, precisarei produzir", "Vou usar fotos de fornecedor"],
    required: true
  },

  // 6. Conteúdo e páginas
  {
    id: "sec_6",
    type: "section",
    label: "📄 6. Conteúdo e Páginas",
    required: false
  },
  {
    id: "q6_2",
    type: "checkbox",
    label: "Quais páginas institucionais você precisa?",
    options: ["Sobre nós", "Contato", "Política de Troca", "Política de Privacidade", "Termos de Uso", "Blog"],
    required: false
  },

  // 7. Marketing e Integrações
  {
    id: "sec_7",
    type: "section",
    label: "📈 7. Marketing e Integrações",
    required: false
  },
  {
    id: "q7_2",
    type: "checkbox",
    label: "Quais integrações você deseja?",
    options: ["Instagram / Facebook Shop", "Botão WhatsApp", "Google Analytics", "Pixel do Meta (Facebook Ads)", "Newsletter / E-mail Marketing"],
    required: false
  },

  // 8. Manutenção
  {
    id: "sec_8",
    type: "section",
    label: "🔐 8. Manutenção",
    required: false
  },
  {
    id: "q8_1",
    type: "radio",
    label: "Quem irá administrar a loja no dia a dia?",
    options: ["Eu mesmo(a)", "Minha equipe", "Vou contratar alguém"],
    required: true
  },
  {
    id: "q8_2",
    type: "radio",
    label: "Deseja contratar manutenção mensal?",
    options: ["Sim", "Não, apenas entrega pontual"],
    required: true
  },

  // 9. Orçamento
  {
    id: "sec_9",
    type: "section",
    label: "💰 9. Orçamento e Prazo",
    required: false
  },
  {
    id: "q9_1",
    type: "text",
    label: "Prazo ideal para entrega?",
    required: false
  },
  {
    id: "q9_2",
    type: "radio",
    label: "Existe um orçamento estimado para o projeto?",
    options: ["Até R$ 2.000", "R$ 2.000 - R$ 5.000", "R$ 5.000 - R$ 10.000", "Acima de R$ 10.000", "Prefiro não informar agora"],
    required: true
  },

  // 10. Observações
  {
    id: "sec_10",
    type: "section",
    label: "⚠️ 10. Observações Finais",
    required: false
  },
  {
    id: "q10_1",
    type: "textarea",
    label: "Existe alguma exigência técnica ou funcionalidade específica?",
    required: false
  }
];

async function main() {
  console.log('Criando template de Loja Virtual...');
  
  const template = await prisma.form.create({
    data: {
      title: "Modelo - Loja Virtual",
      slug: "modelo-loja-virtual-" + Date.now(), // Slug único
      description: "Briefing completo para criação de E-commerce e Lojas Virtuais.",
      clientName: "Modelo Padrão",
      schema: lojaVirtualSchema
    }
  });

  console.log(`Template criado com sucesso! ID: ${template.id}`);
  console.log(`Slug: ${template.slug}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
