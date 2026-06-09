# 🚀 Backend HUB Fibra

Backend do CRM Inteligente HUB Fibra, integrado com banco de dados MySQL hospedado no Railway.

---

## 🛠️ Tecnologias

| Tecnologia | Função |
|------------|---------|
| Node.js | Ambiente de execução |
| Express | Framework backend |
| MySQL | Banco de dados |
| Dotenv | Variáveis de ambiente |
| CORS | Controle de acesso |

---

## ▶️ Como rodar localmente

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Crie um arquivo `.env`

Na raiz do projeto:

```env
PORT=3001

DB_HOST=seu_host
DB_PORT=sua_porta
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=hub_fibra
```

> ⚠️ O arquivo `.env` não é versionado por conter credenciais sensíveis. Para rodar o projeto, solicite as credenciais do banco ao responsável pelo servidor Railway.

### 4. Inicie o servidor

```bash
npm start
```

### 5. API disponível

```txt
http://localhost:3001
```

---

# 📌 Rotas Disponíveis

## ❤️ Health

| Método | Rota |
|---------|---------|
| GET | `/api/health` |

---

## 🏢 Empresas

| Método | Rota |
|---------|---------|
| GET | `/api/companies` |
| GET | `/api/companies/:id` |
| POST | `/api/companies` |
| PUT | `/api/companies/:id` |
| DELETE | `/api/companies/:id` |

---

## 📈 Engajamento

| Método | Rota |
|---------|---------|
| GET | `/api/engagement` |
| POST | `/api/engagement/recalculate/:id` |

---

## 🔔 Alertas

| Método | Rota |
|---------|---------|
| GET | `/api/alerts` |

---

## 💡 Recomendações

| Método | Rota |
|---------|---------|
| GET | `/api/recommendations` |

---

## 📊 Relatórios

| Método | Rota |
|---------|---------|
| GET | `/api/reports` |
| POST | `/api/reports` |

---

## ⚙️ Configurações

| Método | Rota |
|---------|---------|
| GET | `/api/settings` |
| PUT | `/api/settings/:key` |

---
