/// <reference types="vitest" />

import { URL, fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { configDefaults } from 'vitest/config'

import AutoImport from 'unplugin-auto-import/vite'
import dts from 'vite-plugin-dts'
import UnoCSS from 'unocss/vite'
import { autoImport as UtilsAutoImport } from '@s3xysteak/utils'

import pkg from './package.json'
import {
  supportAutoImportDts,
  supportAutoImportPlugin,
} from './src/plugins/supportAutoImport'

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),

    UnoCSS(),

    dts({ rollupTypes: true, afterBuild: supportAutoImportDts }),
    AutoImport({
      dirs: ['src/core/viewerStore', 'src/shared'],
      dts: 'types/auto-imports.d.ts',
      imports: [
        UtilsAutoImport(),
      ],
    }),

    supportAutoImportPlugin(),
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
    ],
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'cesium-use',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies || {}),
        ...Object.keys(pkg.devDependencies || {}),
      ],
    },
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
