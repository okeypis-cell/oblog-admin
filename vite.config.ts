import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

export default defineConfig({
  base: '/public/admin/',
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
        }
      ],
      dts: 'types/auto-import.d.ts'
    }),
    Components({
      dts: 'types/components.d.ts',
      resolvers: [NaiveUiResolver()]
    })
  ],
  server: {
    host: 'localhost'
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '/#/': resolve(__dirname, 'types')
    }
  }
})
