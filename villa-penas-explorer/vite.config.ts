import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import type { Plugin, ProxyOptions, Connect } from 'vite';

// CORS del servicio no permite localhost. Este puente no cambia el backend.
const publicOnly: Plugin = {
  name: 'public-get-only',
  configureServer(server) { server.middlewares.use(guard); },
  configurePreviewServer(server) { server.middlewares.use(guard); },
};
const guard: Connect.NextHandleFunction = (req, res, next) => {
  if (!req.url?.startsWith('/consulta')) return next();
  if (req.method !== 'GET' || !/^\/consulta\/public\/(paquetes(?:\/[1-9]\d*)?|opciones-productos-adicionales)$/.test(req.url)) {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    return res.end(JSON.stringify({ message: 'Solo se permiten las consultas públicas seleccionadas.' }));
  }
  next();
};
const bridge: ProxyOptions = {
  target: 'https://villa-penas-production.up.railway.app',
  changeOrigin: true,
  rewrite: path => path.replace(/^\/consulta/, ''),
  configure(proxy) {
    proxy.on('proxyReq', request => {
      request.removeHeader('cookie');
      request.removeHeader('authorization');
      request.removeHeader('origin');
    });
    proxy.on('proxyRes', (response, request) => {
      response.headers['x-upstream-url'] = `https://villa-penas-production.up.railway.app${request.url}`;
    });
  },
};
export default defineConfig({
  plugins: [publicOnly, react()],
  server: { proxy: { '/consulta': bridge } },
  preview: { proxy: { '/consulta': bridge } },
  test: { environment: 'node', restoreMocks: true },
});
