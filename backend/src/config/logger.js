const winston = require('winston');
const path = require('path');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Logs de erro
    new winston.transports.File({
      filename: path.join('/usr/src/app/logs', 'error.log'),
      level: 'error'
    }),
    // Logs gerais
    new winston.transports.File({
      filename: path.join('/usr/src/app/logs', 'combined.log')
    })
  ]
});

// Se não estivermos em produção, também log para o console
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

module.exports = logger;
