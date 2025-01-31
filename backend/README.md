# Stock Control API

A RESTful API for stock control management, built with Node.js and Express.

## Features

- Products CRUD
- Categories CRUD
- Warehouses CRUD
- JSON-based data persistence
- Error logging
- CORS enabled
- Request logging with Morgan

## Tecnologias

- Node.js
- Express
- Jest (testes)
- Morgan (logging)
- CORS

## Requisitos

- Node.js >= 14.0.0
- NPM ou Yarn

## Instalação Local

```bash
# Clonar o repositório
git clone [seu-repositorio]
cd project-x27

# Instalar dependências
npm install

# Iniciar em modo desenvolvimento
npm run dev

# Executar testes
npm test
```

## Project Structure

```
src/
  ├── controllers/     # Route controllers
  ├── models/         # Data models
  ├── routes/         # API routes
  ├── middlewares/    # Express middlewares
  ├── config/         # Configuration files
  ├── database/       # JSON database files
  └── utils/          # Utility functions
```

## API Endpoints

### Produtos
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get a product
- `POST /api/products` - Create a product
- `PUT /api/products/:id` - Update a product
- `DELETE /api/products/:id` - Delete a product
- GET /api/products/category/:categoryId

### Categorias
- `GET /api/categories` - List all categories
- `GET /api/categories/:id` - Get a category
- `POST /api/categories` - Create a category
- `PUT /api/categories/:id` - Update a category
- `DELETE /api/categories/:id` - Delete a category

### Armazéns
- `GET /api/warehouses` - List all warehouses
- `GET /api/warehouses/:id` - Get a warehouse
- `POST /api/warehouses` - Create a warehouse
- `PUT /api/warehouses/:id` - Update a warehouse
- `DELETE /api/warehouses/:id` - Delete a warehouse

## Contribuindo

1. Faça o fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença ISC.
