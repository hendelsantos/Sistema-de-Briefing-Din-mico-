# Configuração Rápida do Banco de Dados Local

## Opção 1: PostgreSQL via Docker (Mais Rápido)

```bash
# Criar e iniciar container PostgreSQL
docker run --name briefing-postgres \
  -e POSTGRES_USER=briefing \
  -e POSTGRES_PASSWORD=briefing123 \
  -e POSTGRES_DB=briefing \
  -p 5432:5432 \
  -d postgres:15

# Verificar se está rodando
docker ps
```

Depois, atualize o `.env`:

```env
DATABASE_URL="postgresql://briefing:briefing123@localhost:5432/briefing?schema=public"
```

## Opção 2: PostgreSQL Instalado Localmente

### Ubuntu/Debian:

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### Criar banco e usuário:

```bash
sudo -u postgres psql

# No console do PostgreSQL:
CREATE DATABASE briefing;
CREATE USER briefing WITH PASSWORD 'briefing123';
GRANT ALL PRIVILEGES ON DATABASE briefing TO briefing;
\q
```

Atualize o `.env`:

```env
DATABASE_URL="postgresql://briefing:briefing123@localhost:5432/briefing?schema=public"
```

## Opção 3: Usar SQLite (Desenvolvimento Rápido)

Edite `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

Atualize o `.env`:

```env
DATABASE_URL="file:./dev.db"
```

---

## Após Configurar o Banco

Execute as migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

Reinicie o servidor:

```bash
npm run dev
```

Teste o login em http://localhost:3000/login

- Email: `admin@briefing.com`
- Senha: `admin123`
