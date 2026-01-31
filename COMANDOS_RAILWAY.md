# 🚂 Comandos Railway CLI - Executar em Sequência

## Após a instalação do Railway CLI terminar, execute estes comandos:

### 1. Login no Railway

```bash
railway login
```

**O que vai acontecer:**

- Vai abrir o navegador automaticamente
- Faça login com GitHub
- Autorize o Railway CLI
- Volte para o terminal

---

### 2. Linkar ao Projeto

```bash
railway link
```

**O que vai acontecer:**

- Vai mostrar uma lista dos seus projetos
- Use as setas ↑↓ para selecionar: `Sistema-de-Briefing-Din-mico-`
- Pressione Enter

---

### 3. Adicionar PostgreSQL (se ainda não tiver)

```bash
railway add
```

**O que vai acontecer:**

- Vai mostrar opções de serviços
- Selecione: `PostgreSQL`
- Aguarde a criação (1-2 minutos)

---

### 4. Executar Migrations

```bash
railway run npx prisma migrate deploy
```

**O que vai acontecer:**

- Vai conectar ao banco de dados do Railway
- Vai criar todas as tabelas (forms, submissions)
- Vai mostrar: "Migration applied successfully"

---

### 5. Verificar Variáveis de Ambiente

```bash
railway variables
```

**O que vai acontecer:**

- Vai listar todas as variáveis configuradas
- Verifique se tem:
  - DATABASE_URL
  - ADMIN_EMAIL
  - ADMIN_PASSWORD
  - NEXTAUTH_SECRET
  - NEXTAUTH_URL

---

### 6. Ver Logs (Opcional)

```bash
railway logs
```

**O que vai acontecer:**

- Vai mostrar os logs em tempo real do seu app
- Pressione Ctrl+C para sair

---

## ✅ Checklist

- [ ] Railway CLI instalado
- [ ] `railway login` executado
- [ ] Projeto linkado
- [ ] PostgreSQL adicionado (se necessário)
- [ ] Migrations executadas
- [ ] Variáveis verificadas
- [ ] App testado em: https://sistema-de-briefing-din-mico-production.up.railway.app/login

---

## 🎯 Resultado Esperado

Após executar todos os comandos:

- ✅ Sem erro 500
- ✅ Login funcionando
- ✅ Dashboard carregando
- ✅ Pronto para criar briefings!
