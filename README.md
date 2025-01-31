# Project X27 - Sistema de Gerenciamento de Inventário
### Autor: Wictor Hiago Souza | Fullstack Engineer
### E-mail: wictor.backup@gmail.com
### LinkedIn: https://www.linkedin.com/in/dev-wictor-hiago
### Site: https://wictordev.vercel.app

# Informações Gerais

Este é um sistema de gerenciamento de inventário construído com Next.js no frontend e Node.js/Express no backend.

## 🚀 Tecnologias

### Frontend
- Next.js 15.1.6
- TypeScript
- Tailwind CSS
- React 19
- Docker

### Backend
- Node.js 20
- Express
- Winston (logging)
- Docker

## 🛠️ Requisitos

- Docker
- Docker Compose
- Node.js 20.x (para desenvolvimento local)
- npm ou yarn

## 🐳 Rodando com Docker

### 1. Preparação do Ambiente

Clone o repositório:
```bash
git clone https://github.com/seu-usuario/project-x27.git
cd project-x27
```

Crie os diretórios necessários para os logs:
```bash
mkdir -p logs/frontend logs/backend
```

### 2. Portas e Endpoints

O projeto utiliza as seguintes portas:
- Frontend: http://localhost:3001
- Backend: http://localhost:3000

Endpoints principais:
- Frontend UI: http://localhost:3001
- Backend API: http://localhost:3000/api
  - Produtos: http://localhost:3000/api/products
  - Categorias: http://localhost:3000/api/categories
  - Armazéns: http://localhost:3000/api/warehouses

### 3. Construindo e Iniciando os Containers

Para construir e iniciar todos os serviços com logs em tempo real:
```bash
sudo docker-compose up --build
```

Para rodar em background:
```bash
sudo docker-compose up -d --build
```

### 4. Monitoramento e Logs

Verificar status dos containers:
```bash
sudo docker-compose ps
```

Visualizar logs:
```bash
# Todos os logs em tempo real
sudo docker-compose logs -f

# Apenas logs do frontend
sudo docker-compose logs frontend

# Apenas logs do backend
sudo docker-compose logs backend
```

### 5. Parando os Containers

Para parar os serviços:
```bash
sudo docker-compose down
```

Para parar e remover volumes:
```bash
sudo docker-compose down -v
```

## 📁 Estrutura do Docker

### Volumes

O projeto utiliza três tipos de volumes:
1. Volumes para logs:
   - `./logs/frontend`: Logs do frontend
   - `./logs/backend`: Logs do backend

2. Volumes de código fonte (para desenvolvimento):
   - `./frontend-next`: Código fonte do frontend
   - `./backend`: Código fonte do backend

3. Volumes anônimos:
   - `node_modules`
   - `.next` (build do Next.js)

### Rede

- Nome: `project-x27-network`
- Tipo: bridge
- Uso: Comunicação entre containers frontend e backend

## 📝 Estrutura de Logs

```
logs/
├── frontend/
│   ├── combined.log  # Todos os logs
│   └── error.log     # Apenas erros
└── backend/
    ├── combined.log  # Todos os logs
    └── error.log     # Apenas erros
```

## 📚 Documentação da API

Base URL: `http://localhost:3000/api`

### 🏷️ Produtos

#### Listar todos os produtos
```http
GET /products
```
**Resposta**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "price": "number",
    "quantity": "number",
    "categoryId": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

#### Obter produto por ID
```http
GET /products/{id}
```
**Resposta**: Objeto do produto ou 404 se não encontrado

#### Criar novo produto
```http
POST /products
```
**Body**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "quantity": "number",
  "categoryId": "string"
}
```
**Resposta**: Objeto do produto criado

#### Atualizar produto
```http
PUT /products/{id}
```
**Body**
```json
{
  "name": "string",
  "description": "string",
  "price": "number",
  "quantity": "number",
  "categoryId": "string"
}
```
**Resposta**: Objeto do produto atualizado ou 404 se não encontrado

#### Deletar produto
```http
DELETE /products/{id}
```
**Resposta**: 204 No Content ou 404 se não encontrado

#### Listar produtos por categoria
```http
GET /products/category/{categoryId}
```
**Resposta**: Array de produtos da categoria

### 📁 Categorias

#### Listar todas as categorias
```http
GET /categories
```
**Resposta**
```json
[
  {
    "id": "string",
    "name": "string",
    "description": "string",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

#### Obter categoria por ID
```http
GET /categories/{id}
```
**Resposta**: Objeto da categoria ou 404 se não encontrada

#### Criar nova categoria
```http
POST /categories
```
**Body**
```json
{
  "name": "string",
  "description": "string"
}
```
**Resposta**: Objeto da categoria criada

#### Atualizar categoria
```http
PUT /categories/{id}
```
**Body**
```json
{
  "name": "string",
  "description": "string"
}
```
**Resposta**: Objeto da categoria atualizada ou 404 se não encontrada

#### Deletar categoria
```http
DELETE /categories/{id}
```
**Resposta**: 204 No Content ou 404 se não encontrada

### 🏭 Armazéns

#### Listar todos os armazéns
```http
GET /warehouses
```
**Resposta**
```json
[
  {
    "id": "string",
    "name": "string",
    "address": "string",
    "capacity": "number",
    "createdAt": "string",
    "updatedAt": "string"
  }
]
```

#### Obter armazém por ID
```http
GET /warehouses/{id}
```
**Resposta**: Objeto do armazém ou 404 se não encontrado

#### Criar novo armazém
```http
POST /warehouses
```
**Body**
```json
{
  "name": "string",
  "address": "string",
  "capacity": "number"
}
```
**Resposta**: Objeto do armazém criado

#### Atualizar armazém
```http
PUT /warehouses/{id}
```
**Body**
```json
{
  "name": "string",
  "address": "string",
  "capacity": "number"
}
```
**Resposta**: Objeto do armazém atualizado ou 404 se não encontrado

#### Deletar armazém
```http
DELETE /warehouses/{id}
```
**Resposta**: 204 No Content ou 404 se não encontrado

### Códigos de Status

| Código | Descrição |
|--------|-----------|
| 200 | Sucesso |
| 201 | Criado com sucesso |
| 204 | Sem conteúdo |
| 400 | Requisição inválida |
| 404 | Não encontrado |
| 500 | Erro interno do servidor |

### Observações

1. Todas as datas são retornadas no formato ISO 8601
2. Todos os IDs são strings únicas
3. Os endpoints retornam erro 400 para dados inválidos
4. Autenticação será implementada em versões futuras

## 🔧 Desenvolvimento

### Estrutura do Projeto
```
project-x27/
├── frontend-next/
│   ├── app/          # Páginas e componentes Next.js
│   ├── public/       # Arquivos estáticos
│   ├── .dockerignore # Arquivos ignorados no build Docker
│   └── Dockerfile    # Configuração Docker do frontend
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── .dockerignore # Arquivos ignorados no build Docker
│   └── Dockerfile    # Configuração Docker do backend
├── logs/             # Diretório de logs
├── .gitignore       # Arquivos ignorados pelo Git
├── .dockerignore    # Arquivos ignorados no build Docker
└── docker-compose.yml
```

### Arquivos de Configuração

#### .gitignore
Arquivo na raiz do projeto que especifica quais arquivos e diretórios devem ser ignorados pelo Git:
- `node_modules/`: Dependências do Node.js
- `logs/`: Arquivos de log
- `.env`: Arquivos de variáveis de ambiente
- `.next/`: Build do Next.js
- Outros arquivos temporários e de IDE

#### .dockerignore
Arquivo na raiz do projeto que especifica quais arquivos não devem ser copiados durante o build Docker:
- Arquivos de controle de versão (`.git/`)
- Dependências (`node_modules/`)
- Arquivos de ambiente (`.env`)
- Arquivos de log
- Arquivos de configuração de desenvolvimento
- Documentação e arquivos não necessários em produção

Cada subprojeto (frontend e backend) também possui seu próprio `.dockerignore` para controle mais granular.

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.
O arquivo de licença está disponível em inglês e português.
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
The license file is available in both English and Portuguese.
