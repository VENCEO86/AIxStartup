import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: false, // 포트 충돌 시 자동으로 다른 포트 사용
    host: true,
    open: false, // 자동 브라우저 열기 비활성화
    cors: true,
    hmr: {
      overlay: false // HMR 오버레이 비활성화로 성능 향상
    }
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false, // 개발 시에만 필요
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom']
        }
      }
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom']
  }
})

