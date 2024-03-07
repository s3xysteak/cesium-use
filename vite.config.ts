/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configDefaults } from 'vitest/config'

import AutoImport from 'unplugin-auto-import/vite'
import dts from 'vite-plugin-dts'

import UnoCSS from 'unocss/vite'

import pkg from './package.json'
import {
  supportAutoImportPlugin,
  supportAutoImportDts
} from './src/shared/supportAutoImport'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    UnoCSS(),

    dts({ rollupTypes: true, afterBuild: supportAutoImportDts }),
    AutoImport({
      dirs: ['src/core/viewerStore', 'src/shared'],
      imports: ['vitest'],
      dts: 'types/auto-imports.d.ts'
    }),

    supportAutoImportPlugin()
  ],
  test: {
    environment: 'jsdom',
    exclude: [
      ...configDefaults.exclude,
      'e2e/*',
      '**/public/**',
      '**/.{vscode,svn}/**'
    ],
    root: fileURLToPath(new URL('./', import.meta.url))
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'cesium-use'
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies || {})
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
