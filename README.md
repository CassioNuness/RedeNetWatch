# 🚨 RedeNetWatch

Sistema de monitoramento e gerenciamento de incidentes de rede desenvolvido com React, Node.js e PostgreSQL.

---

## 📌 Funcionalidades

- Cadastro de incidentes
- Listagem de incidentes
- Edição de incidentes
- Exclusão de incidentes
- Filtros por status
- Busca por equipamento ou título
- Dashboard com métricas
- Interface responsiva

---

## 🛠️ Tecnologias utilizadas

### Frontend
- React
- Vite
- CSS3

### Backend
- Node.js
- Express

### Banco de dados
- PostgreSQL

---

## 📷 Preview do sistema

### Dashboard
<img width="100%" src="./prints/dashboard.png" />

---

## 🚀 Como executar o projeto

### Backend

```bash
cd backend
npm install
npm run dev
```

Servidor:
```bash
http://localhost:3000
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicação:
```bash
http://localhost:5173
```

---

## 📡 Endpoints da API

### Listar incidentes

```http
GET /incidents
```

### Criar incidente

```http
POST /incidents
```

### Atualizar incidente

```http
PUT /incidents/:id
```

### Excluir incidente

```http
DELETE /incidents/:id
```

---

## 📌 Objetivo do projeto

Projeto desenvolvido como desafio técnico para demonstrar conhecimentos em:

- Desenvolvimento Full Stack
- Integração frontend/backend
- Manipulação de estado no React
- Consumo de API REST
- Organização de componentes
- UX/UI básica para sistemas corporativos

---

## 👨‍💻 Autor

Cássio Nunes