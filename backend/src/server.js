const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const logger = require('./config/logger');

// Importação das rotas
const categoryRoutes = require('./routes/categoryRoutes');
const productRoutes = require('./routes/productRoutes');
const warehouseRoutes = require('./routes/warehouseRoutes');

const app = express();

// Configurações
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(morgan('combined'));

// Middleware para processar dados de formulários
app.use(express.urlencoded({ extended: true }));

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    ip: req.ip,
    userAgent: req.get('user-agent')
  });
  next();
});

// Criação do diretório de logs se não existir
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

// Criação do diretório de banco de dados se não existir
const dbDir = path.join(__dirname, 'database');
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
    
    // Criar arquivos JSON iniciais se não existirem
    const initialData = { data: [] };
    ['products.json', 'categories.json', 'warehouses.json'].forEach(file => {
        const filePath = path.join(dbDir, file);
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(initialData));
        }
    });
}

// Rotas da API
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/warehouses', warehouseRoutes);

// Middleware de erro personalizado
app.use((err, req, res, next) => {
  logger.error('Error:', { 
    method: req.method,
    url: req.url,
    error: err.message,
    stack: err.stack 
  });

  // Se for um erro conhecido (lançado por nós), retorna a mensagem
  if (err.message === 'Categoria não encontrada') {
    return res.status(400).json({ 
      error: err.message 
    });
  }

  // Para outros erros, retorna uma mensagem genérica
  res.status(500).json({ 
    error: 'Ocorreu um erro ao processar sua requisição' 
  });
});

// Rota 404 para endpoints não encontrados
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Health check endpoint
app.get('/health', (req, res) => {
  logger.info('Health check requested');
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`API running on port ${PORT}`);
});
