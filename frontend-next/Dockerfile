FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . .

# Criar diretório para logs
RUN mkdir -p /usr/src/app/logs

# Build da aplicação
RUN npm run build

# Expor porta
EXPOSE 3001

# Definir variável de ambiente para a porta
ENV PORT=3001

# Comando para iniciar a aplicação
CMD ["npm", "start"]
