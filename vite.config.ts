/// <reference types="vitest" />

import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import ExportCollector from 'unplugin-export-collector/vite'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { configDefaults } from 'vitest/config'
import alias from './alias'
import pkg from './package.json'

import HandleResolvers from './plugins/resolvers'

export default defineConfig({
  plugins: [
    vue(),

    UnoCSS(),

    dts({ rollupTypes: true }),
    ExportCollector({
      exclude: [
        'Located',
      ],
    }),
    HandleResolvers(),
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
        './src/imports.ts',
        './src/resolvers.ts',
      ],
      formats: ['es'],
      fileName(_, entryName) {
        return `${entryName}.mjs`
      },
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
      ],
    },
    minify: false,
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
