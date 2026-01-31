# 📋 Sistema de Briefing Dinâmico

> Plataforma web para criação e gestão de briefings personalizados para clientes

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5-2D3748)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC)](https://tailwindcss.com/)

## 🎯 Sobre o Projeto

Sistema completo para criar formulários de briefing personalizados e compartilhá-los com clientes através de links públicos. Ideal para agências, freelancers e empresas que precisam coletar informações estruturadas de clientes de forma profissional.

### ✨ Principais Funcionalidades

- 🔐 **Painel Admin Protegido** - Acesso seguro com autenticação
- 🎨 **Form Builder Visual** - Crie formulários customizados sem código
- 📝 **5 Tipos de Perguntas** - Texto, textarea, select, checkbox e radio
- 🔗 **Links Públicos Únicos** - Cada briefing gera uma URL exclusiva
- 👥 **Sem Login do Cliente** - Clientes acessam diretamente via link
- 📊 **Dashboard Completo** - Visualize todas as respostas organizadas
- 💾 **Armazenamento Flexível** - Dados em JSON no PostgreSQL

## 🚀 Demo

```
Admin: http://seu-dominio.com/login
Público: http://seu-dominio.com/b/[slug-do-briefing]
```

## 📸 Screenshots

### Painel Admin

![Dashboard](/home/hendel/.gemini/antigravity/brain/cc6f5adb-7e26-4188-a79a-79ff9e125351/homepage_final_1769858676623.png)

### Demonstração do Sistema

![Demo](/home/hendel/.gemini/antigravity/brain/cc6f5adb-7e26-4188-a79a-79ff9e125351/briefing_local_test_1769858632401.webp)

## 🛠️ Tecnologias

- **Framework:** Next.js 14 (App Router)
- **Linguagem:** TypeScript
- **Estilização:** Tailwind CSS
- **Banco de Dados:** PostgreSQL
- **ORM:** Prisma
- **Autenticação:** NextAuth.js
- **Validação:** Zod + React Hook Form

## 📦 Instalação

### Pré-requisitos

- Node.js 18+
- PostgreSQL (ou Docker)
- npm ou yarn

### Passo a Passo

1. **Clone o repositório**

```bash
git clone git@github.com:hendelsantos/Sistema-de-Briefing-Din-mico-.git
cd Sistema-de-Briefing-Din-mico-
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env
```

Edite o `.env`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/briefing"
ADMIN_EMAIL="seu@email.com"
ADMIN_PASSWORD="sua-senha-segura"
NEXTAUTH_SECRET="chave-secreta-gerada"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Configure o banco de dados**

```bash
npx prisma migrate dev --name init
npx prisma generate
```

5. **Inicie o servidor**

```bash
npm run dev
```

Acesse: http://localhost:3000

## 🚢 Deploy no Railway

### Preparação

1. **Crie uma conta no [Railway](https://railway.app/)**

2. **Instale o Railway CLI** (opcional)

```bash
npm i -g @railway/cli
railway login
```

### Deploy via GitHub

1. No Railway, clique em **"New Project"**
2. Selecione **"Deploy from GitHub repo"**
3. Escolha este repositório
4. Adicione um **PostgreSQL** ao projeto
5. Configure as variáveis de ambiente:
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (URL do Railway)
   - `DATABASE_URL` (gerada automaticamente)

6. Execute as migrations:

```bash
railway run npx prisma migrate deploy
```

### Deploy via CLI

```bash
railway init
railway add postgresql
railway up
railway run npx prisma migrate deploy
```

## 📖 Como Usar

### Para Administradores

1. Acesse `/login` com suas credenciais
2. No dashboard, clique em **"Novo Briefing"**
3. Preencha:
   - Título do briefing
   - Slug (URL amigável)
   - Nome do cliente (opcional)
   - Descrição
4. Adicione perguntas usando o Form Builder
5. Salve e copie o link público
6. Envie o link para o cliente

### Para Clientes

1. Acesse o link recebido (ex: `/b/cliente-acme`)
2. Preencha o formulário
3. Clique em "Enviar Respostas"
4. Pronto! ✅

### Visualizar Respostas

1. No dashboard, clique em **"Ver Respostas"**
2. Veja todas as submissões organizadas
3. Cada resposta mostra:
   - Email do cliente (se fornecido)
   - Data e hora
   - Todas as respostas formatadas

## 🗂️ Estrutura do Projeto

```
/app
  /admin              # Painel protegido
    /novo             # Criar briefing
    /respostas/[id]   # Ver respostas
  /api
    /auth             # NextAuth
    /forms            # CRUD de formulários
    /submissions      # Submissões
  /b/[slug]           # Páginas públicas
  /login              # Autenticação

/components
  /builder            # Form Builder
  /renderer           # Form Renderer

/lib
  /auth.ts            # Config NextAuth
  /prisma.ts          # Cliente Prisma

/prisma
  /schema.prisma      # Schema do banco

/types
  /form.ts            # TypeScript types
```

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Linter
npx prisma studio    # Interface visual do banco
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

MIT

## 👨‍💻 Autor

**Hendel Santos**

- GitHub: [@hendelsantos](https://github.com/hendelsantos)

---

⭐ Se este projeto foi útil, considere dar uma estrela!
