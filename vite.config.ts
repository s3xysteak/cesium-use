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
      writeTo: './packages/imports.ts',
      entries: ['./packages/index'],
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
      'packages/composables/**/*.ts',
      'packages/components/**/*.ts',
      'packages/utils/**/*.ts',
      'packages/shared/**/*.ts',
    ],
  },
  build: {
    lib: {
      entry: [
        './packages/index.ts',
        './packages/imports.ts',
        './packages/resolvers.ts',
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
        './packages/demo/container.vue',
      ],
    },
  },
})
