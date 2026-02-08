import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [
          './src/scss'
        ],
      },
    },
  },
  server: {
    host: '0.0.0.0',
    watch: {
      usePolling: true,  // Включает polling вместо fs.watch
      interval: 1000     // Интервал опроса в миллисекундах
    }
  }
})