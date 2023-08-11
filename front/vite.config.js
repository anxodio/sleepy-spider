import { defineConfig } from 'vite'
import alias from '@rollup/plugin-alias'
import { resolve } from 'path'

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  optimizeDeps: {
    exclude: ['sleepy-spider-lib']
  },
  server: {
    port: 8000,
  },
  plugins: [
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, 'src')
        }
      ]
    })
  ]
})
