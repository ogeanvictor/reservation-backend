# Desk Reservation API

API RESTful desenvolvida com **NestJS** para gerenciamento de **reservas de mesas (desks)** em ambientes compartilhados. Suporta autenticação com JWT, controle de acesso baseado em papéis (admin/usuário), além de funcionalidades completas para criação, listagem, atualização, cancelamento e exclusão de reservas e mesas.

## 📦 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Docker](https://www.docker.com/)
- [Jest](https://jestjs.io/) (testes unitários e e2e)
- [Swagger](http://localhost:3000/api) (documentação da API)

---

## 🚀 Funcionalidades

### Autenticação

- Registro de usuário
- Login com geração de token JWT
- Proteção de rotas com `@UseGuards(AuthGuard)`
- Controle de acesso com `@Roles(UserRole.ADMIN)`

### Desks

- Criar, listar, atualizar e deletar mesas
- Filtro e paginação (via query string)

### Reservas

- Criar e cancelar reservas
- Listar reservas por usuário e todas (admin)
- Validação de regras (por exemplo, um usuário só pode cancelar a própria reserva)

---

## 🛠️ Como Executar a API Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/nome-do-projeto.git
cd nome-do-projeto
```

### 2. Instalar dependências

yarn install

### 3. Criar arquivo .env

DATABASE_URL="postgresql://user:password@localhost:5432/db_name?schema=public"
JWT_SECRET="sua_chave_jwt"

### 4. Rode a migration

npx prisma migrate dev

### 4. Execute o projeto

yarn start:dev
