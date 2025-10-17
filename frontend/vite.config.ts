import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [
    react(),
    checker({ typescript: true }) // 타입 체크
  ],
  // 경로 설정
  resolve: {
    alias: {"@": path.resolve(__dirname, "src")}
  },
  // css import
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/styles/variables" as *;
        `
      }
    }
  },
  // server 설정
  server: {
    proxy: {
      '/api' : {
        target: 'http://140.83.49.106:8081',
        changeOrigin: true,
      }
    }
  }
})
