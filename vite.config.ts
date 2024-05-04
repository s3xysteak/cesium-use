/// <reference types="vitest" />

import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configDefaults } from 'vitest/config'

import AutoImport from 'unplugin-auto-import/vite'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import UtilsResolver from '@s3xysteak/utils/resolver'

import ExportCollector from 'unplugin-export-collector/vite'

import pkg from './package.json'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    UnoCSS(),

    dts({ rollupTypes: true }),
    AutoImport({
      dirs: ['src/core/viewerStore'],
      dts: 'types/auto-imports.d.ts',
      resolvers: [
        UtilsResolver(),
      ],
    }),
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
      'src/core/**/*.ts',
      'src/components/**/*.ts',
      'src/shared/**/*.ts',
      'src/utils/**/*.ts',
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
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
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
