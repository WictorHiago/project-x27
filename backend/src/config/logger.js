const winston = require('winston');
const path = require('path');
const fs = require('fs');

// Definir o diretório de logs baseado no ambiente
const LOG_DIR = process.env.NODE_ENV === 'production' 
  ? '/usr/src/app/logs'
  : path.join(__dirname, '../../logs');

// Criar diretório de logs se não existir
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Logs de erro
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'error.log'),
      level: 'error'
    }),
    // Logs gerais
    new winston.transports.File({
      filename: path.join(LOG_DIR, 'combined.log')
    })
  ]
});

// Se não estivermos em produção, também log para o console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.simple()
    )
  }));
}

module.exports = logger;
