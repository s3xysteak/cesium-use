/// <reference types="vitest" />

import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { configDefaults } from 'vitest/config'

import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import ExportCollector from 'unplugin-export-collector/vite'
import alias from './alias'

import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),

    UnoCSS(),

    dts({ rollupTypes: true }),
    ExportCollector({
      writeTo: './src/resolver.ts',
      exportDefault: true,
      exclude: [
        'Located',
      ],
    }),
  ],
  test: {
    environment: 'jsdom',
    exclude: [
      ...configDefaults.exclude,
      'e2e/*',
      '**/public/**',
      '**/.{vscode,svn}/**',
    ],
    root: fileURLToPath(new URL('./', import.meta.url)),
    includeSource: [
      'src/core/composables/**/*.ts',
      'src/core/components/**/*.ts',
      'src/core/utils/**/*.ts',
      'src/shared/**/*.ts',
    ],
  },
  build: {
    lib: {
      entry: [
        './src/index.ts',
        './src/resolver.ts',
      ],
      formats: ['es'],
      fileName(_, entryName) {
        return entryName === 'index' ? 'index.mjs' : 'resolver.mjs'
      },
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
      ],
    },
    sourcemap: true,
  },
  resolve: {
    alias,
  },
  define: {
    'import.meta.vitest': 'undefined',
  },
  server: {
    host: '0.0.0.0',
    warmup: {
      clientFiles: [
        './src/demo/container.vue',
      ],
    },
  },
})
