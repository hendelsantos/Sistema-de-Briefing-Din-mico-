# 🚂 Deploy no Railway - Passo a Passo Completo

## 📋 Informações Importantes

**Seu NEXTAUTH_SECRET gerado:**

```
Y5k+rOjHxRnxebvgEfG4UAHo0hnRuqj0u7h4+nFEZpQ=
```

**Repositório GitHub:**

```
git@github.com:hendelsantos/Sistema-de-Briefing-Din-mico-.git
```

---

## 🎯 Passo 1: Login no Railway

1. ✅ **Você já está na página correta:** https://railway.com/new/github
2. Clique no botão **"Login with GitHub"**
3. Autorize o Railway a acessar seus repositórios do GitHub
4. Aguarde o redirecionamento

---

## 🎯 Passo 2: Criar Novo Projeto

Após o login:

1. Você verá a página **"New Project"**
2. Clique em **"Deploy from GitHub repo"**
3. Na lista de repositórios, procure por: **`Sistema-de-Briefing-Din-mico-`**
4. Clique no repositório para selecioná-lo
5. Aguarde o Railway começar o deploy (isso pode levar 1-2 minutos)

---

## 🎯 Passo 3: Adicionar PostgreSQL

Após o primeiro deploy iniciar:

1. No painel do projeto, clique no botão **"+ New"** (canto superior direito)
2. Selecione **"Database"**
3. Escolha **"Add PostgreSQL"**
4. Aguarde a criação do banco de dados (1-2 minutos)
5. ✅ A variável `DATABASE_URL` será criada automaticamente

---

## 🎯 Passo 4: Configurar Variáveis de Ambiente

1. No painel do projeto, clique no **card do seu app** (não no PostgreSQL)
2. Clique na aba **"Variables"**
3. Clique em **"+ New Variable"** e adicione cada uma das seguintes:

### Variável 1: ADMIN_EMAIL

```
Nome: ADMIN_EMAIL
Valor: seu@email.com
```

(Substitua pelo seu email real)

### Variável 2: ADMIN_PASSWORD

```
Nome: ADMIN_PASSWORD
Valor: SuaSenhaSegura123!
```

(Escolha uma senha forte)

### Variável 3: NEXTAUTH_SECRET

```
Nome: NEXTAUTH_SECRET
Valor: Y5k+rOjHxRnxebvgEfG4UAHo0hnRuqj0u7h4+nFEZpQ=
```

(Use exatamente este valor que foi gerado)

### Variável 4: NEXTAUTH_URL

```
Nome: NEXTAUTH_URL
Valor: ${{RAILWAY_PUBLIC_DOMAIN}}
```

(Use exatamente este valor - o Railway substitui automaticamente)

4. Clique em **"Add"** para cada variável
5. Aguarde o Railway fazer o **redeploy automático** (2-3 minutos)

---

## 🎯 Passo 5: Executar Migrations do Prisma

Após o deploy terminar:

### Opção A: Via Interface Web

1. No card do seu app, clique nos **3 pontinhos** (⋮) no canto superior direito
2. Selecione **"Run a command"**
3. Digite o comando:
   ```bash
   npx prisma migrate deploy
   ```
4. Clique em **"Run"**
5. Aguarde a execução (30-60 segundos)
6. ✅ Você verá "Migration successful" nos logs

### Opção B: Via Railway CLI (Alternativa)

Se preferir usar o terminal:

```bash
# Instalar Railway CLI
npm i -g @railway/cli

# Login
railway login

# Linkar ao projeto (escolha o projeto quando perguntado)
railway link

# Executar migration
railway run npx prisma migrate deploy
```

---

## 🎯 Passo 6: Obter a URL do Projeto

1. No card do seu app, clique na aba **"Settings"**
2. Role até a seção **"Domains"**
3. Você verá uma URL gerada automaticamente, algo como:
   ```
   https://sistema-de-briefing-din-mico-production.up.railway.app
   ```
4. **Copie esta URL** - é o endereço do seu sistema!

---

## 🎯 Passo 7: Testar o Sistema

1. Abra a URL copiada no navegador
2. Adicione `/login` no final:
   ```
   https://sua-url.up.railway.app/login
   ```
3. Faça login com:
   - **Email:** O que você configurou em `ADMIN_EMAIL`
   - **Senha:** O que você configurou em `ADMIN_PASSWORD`
4. ✅ Se conseguir fazer login, está tudo funcionando!

---

## 🎯 Passo 8: Criar Seu Primeiro Briefing

1. Após o login, você estará no dashboard
2. Clique em **"Novo Briefing"**
3. Preencha:
   - **Título:** "Briefing de Teste"
   - **Slug:** "teste" (será gerado automaticamente)
   - **Nome do Cliente:** "Cliente Teste"
   - **Descrição:** "Meu primeiro briefing"
4. Adicione algumas perguntas:
   - Clique em **"Adicionar Pergunta"**
   - Escolha o tipo (texto, select, etc.)
   - Preencha o rótulo
   - Marque como obrigatório se quiser
5. Clique em **"Salvar Briefing"**
6. Copie o link público gerado
7. Abra em uma aba anônima para testar como cliente

---

## ✅ Checklist Final

Marque conforme for completando:

- [ ] Login no Railway realizado
- [ ] Repositório conectado e deploy iniciado
- [ ] PostgreSQL adicionado ao projeto
- [ ] 4 variáveis de ambiente configuradas
- [ ] Migrations executadas com sucesso
- [ ] URL do projeto copiada
- [ ] Login no sistema funcionando
- [ ] Primeiro briefing criado
- [ ] Link público testado

---

## 🐛 Problemas Comuns

### Erro: "Authentication failed"

**Solução:** Verifique se as variáveis `ADMIN_EMAIL` e `ADMIN_PASSWORD` estão corretas.

### Erro: "Database connection failed"

**Solução:**

1. Verifique se o PostgreSQL foi adicionado
2. Confirme que as migrations foram executadas
3. Aguarde 2-3 minutos após adicionar o banco

### Erro: "Module not found"

**Solução:**

1. Vá em "Deployments" e verifique os logs
2. O Railway deve instalar as dependências automaticamente
3. Se não funcionar, force um redeploy

### Deploy travado

**Solução:**

1. Clique nos 3 pontinhos → "Restart"
2. Aguarde 2-3 minutos
3. Verifique os logs em "Deployments"

---

## 📞 Próximos Passos

Após o deploy bem-sucedido:

1. **Domínio Customizado** (Opcional)
   - Em Settings → Domains
   - Clique em "Add Custom Domain"
   - Siga as instruções para configurar seu domínio

2. **Backup do Banco**
   - Railway faz backup automático
   - Você pode exportar via `railway run npx prisma db pull`

3. **Monitoramento**
   - Acesse a aba "Metrics" para ver uso de recursos
   - Verifique "Deployments" para histórico

---

## 🎉 Parabéns!

Se você chegou até aqui e tudo está funcionando, seu **Sistema de Briefing Dinâmico** está no ar! 🚀

**Compartilhe o link público com seus clientes e comece a receber briefings!**

---

## 📧 Suporte

Se tiver dúvidas:

- Documentação Railway: https://docs.railway.app/
- Logs do projeto: Aba "Deployments" no Railway
- Prisma Docs: https://www.prisma.io/docs/
