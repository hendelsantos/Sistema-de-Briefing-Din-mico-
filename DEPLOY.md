# 🚀 Guia de Deploy - GitHub + Railway

## ✅ Status Atual

- ✅ Repositório Git inicializado
- ✅ Todos os arquivos commitados (34 arquivos)
- ✅ README.md criado
- ✅ .gitignore configurado
- ⚠️ Push para GitHub pendente

---

## 📤 Passo 1: Criar Repositório no GitHub

### Opção A: Repositório Já Existe

Se você já criou o repositório `Sistema-de-Briefing-Din-mico-` no GitHub, verifique suas chaves SSH:

```bash
# Testar conexão SSH
ssh -T git@github.com

# Se falhar, adicione sua chave SSH ao GitHub:
# 1. Gere uma chave (se não tiver):
ssh-keygen -t ed25519 -C "seu@email.com"

# 2. Copie a chave pública:
cat ~/.ssh/id_ed25519.pub

# 3. Adicione em: https://github.com/settings/keys
```

Depois, faça o push:

```bash
cd /home/hendel/Projetos/Web/Briefing
git push -u origin main
```

### Opção B: Criar Novo Repositório

1. Acesse: https://github.com/new
2. Nome: `Sistema-de-Briefing-Dinamico` (sem acentos)
3. **NÃO** inicialize com README
4. Clique em "Create repository"

Depois, atualize o remote e faça o push:

```bash
cd /home/hendel/Projetos/Web/Briefing

# Remover remote antigo
git remote remove origin

# Adicionar novo remote
git remote add origin git@github.com:hendelsantos/Sistema-de-Briefing-Dinamico.git

# Push
git push -u origin main
```

---

## 🚂 Passo 2: Deploy no Railway

### 2.1 Criar Conta e Projeto

1. Acesse: https://railway.app/
2. Faça login com GitHub
3. Clique em **"New Project"**
4. Selecione **"Deploy from GitHub repo"**
5. Escolha: `hendelsantos/Sistema-de-Briefing-Dinamico`

### 2.2 Adicionar PostgreSQL

1. No projeto, clique em **"+ New"**
2. Selecione **"Database"** → **"Add PostgreSQL"**
3. Aguarde a criação (1-2 minutos)

### 2.3 Configurar Variáveis de Ambiente

No painel do seu app (não do PostgreSQL):

1. Clique na aba **"Variables"**
2. Adicione:

```env
ADMIN_EMAIL=seu@email.com
ADMIN_PASSWORD=SuaSenhaSegura123!
NEXTAUTH_SECRET=cole-aqui-uma-chave-aleatoria-de-32-caracteres
NEXTAUTH_URL=${{RAILWAY_PUBLIC_DOMAIN}}
```

**Gerar NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

**Nota:** A variável `DATABASE_URL` é criada automaticamente pelo Railway quando você adiciona o PostgreSQL.

### 2.4 Executar Migrations

Após o primeiro deploy:

1. No Railway, vá em **"Settings"** → **"Deploy"**
2. Aguarde o deploy terminar
3. Clique nos **3 pontinhos** → **"Run a command"**
4. Execute:

```bash
npx prisma migrate deploy
```

Ou via Railway CLI:

```bash
# Instalar CLI
npm i -g @railway/cli

# Login
railway login

# Link ao projeto
railway link

# Executar migration
railway run npx prisma migrate deploy
```

### 2.5 Verificar Deploy

1. Clique em **"Settings"** → **"Domains"**
2. Copie a URL gerada (ex: `seu-app.up.railway.app`)
3. Acesse: `https://seu-app.up.railway.app/login`
4. Faça login com as credenciais do `.env`

---

## 🎯 Checklist Final

- [ ] Repositório criado no GitHub
- [ ] Push realizado com sucesso
- [ ] Projeto criado no Railway
- [ ] PostgreSQL adicionado
- [ ] Variáveis de ambiente configuradas
- [ ] Migrations executadas
- [ ] Login funcionando
- [ ] Primeiro briefing criado

---

## 🐛 Troubleshooting

### Erro: "Authentication failed"

- Verifique as credenciais no `.env`
- Certifique-se que as migrations foram executadas

### Erro: "Database connection failed"

- Verifique se o PostgreSQL está rodando
- Confirme que `DATABASE_URL` está correta

### Erro: "Module not found"

- Execute `npm install` no Railway
- Verifique se `package.json` está no repositório

### Deploy não inicia

- Verifique os logs em **"Deployments"**
- Certifique-se que `next.config.js` existe
- Confirme que `package.json` tem os scripts corretos

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs no Railway
2. Teste localmente primeiro
3. Consulte: https://docs.railway.app/

---

## 🎉 Próximos Passos

Após o deploy:

- [ ] Configurar domínio customizado (opcional)
- [ ] Adicionar notificações por email
- [ ] Implementar exportação de respostas (CSV/PDF)
- [ ] Criar temas customizados para páginas públicas
