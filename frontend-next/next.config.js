/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
  env: {
    PORT: 3001
  },
  // Configurar a porta explicitamente
  serverOptions: {
    port: 3001
  }
}

module.exports = nextConfig
