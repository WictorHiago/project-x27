# Project X27 - Sistema de Gerenciamento de Inventário

Este é um sistema de gerenciamento de inventário construído com Next.js no frontend e Node.js/Express no backend.

## 🚀 Tecnologias

- Frontend:
  - Next.js 15.1.6
  - TypeScript
  - Tailwind CSS
  - Docker

- Backend:
  - Node.js
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

### 2. Configuração

O projeto usa as seguintes portas por padrão:
- Frontend: 3001
- Backend: 3000

Se necessário, você pode alterar estas portas no arquivo `docker-compose.yml`.

### 3. Construindo e Iniciando os Containers

Para construir e iniciar todos os serviços:
```bash
docker-compose up --build
```

Para rodar em background:
```bash
docker-compose up -d --build
```

### 4. Parando os Containers

Para parar os serviços:
```bash
docker-compose down
```

Para parar e remover volumes:
```bash
docker-compose down -v
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

## 📝 Logs

### Localização dos Logs

Os logs são salvos em dois lugares:
1. Dentro dos containers em `/usr/src/app/logs`
2. No host em:
   - `./logs/frontend/`
   - `./logs/backend/`

### Estrutura dos Logs

```
logs/
├── frontend/
│   ├── combined.log  # Todos os logs
│   └── error.log     # Apenas erros
└── backend/
    ├── combined.log  # Todos os logs
    └── error.log     # Apenas erros
```

### Visualizando Logs

Logs dos containers:
```bash
# Logs do frontend
docker-compose logs frontend

# Logs do backend
docker-compose logs backend

# Logs em tempo real
docker-compose logs -f
```

Logs do sistema de arquivos:
```bash
# Frontend
tail -f logs/frontend/combined.log

# Backend
tail -f logs/backend/combined.log
```

## 🔧 Manutenção

### Reconstruindo Containers

Se você fizer alterações nos Dockerfiles:
```bash
docker-compose up --build
```

### Limpeza

Remover containers parados:
```bash
docker-compose rm
```

Remover imagens não utilizadas:
```bash
docker image prune
```

## 🚨 Troubleshooting

1. **Portas em uso**
   - Erro: "port is already allocated"
   - Solução: Verifique se as portas 3000 e 3001 estão livres
   ```bash
   sudo lsof -i :3000
   sudo lsof -i :3001
   ```

2. **Problemas de permissão nos logs**
   - Erro: "permission denied" ao escrever logs
   - Solução: Ajuste as permissões dos diretórios de log
   ```bash
   chmod -R 777 logs
   ```

3. **Container não inicia**
   - Verifique os logs do container:
   ```bash
   docker-compose logs [service_name]
   ```

## 👥 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
