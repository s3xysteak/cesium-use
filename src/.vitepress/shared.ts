import { defineConfig } from 'vitepress'

import UnoCss from 'unocss/vite'

import alias from '../../alias'

import MarkdownTransform from './plugins/markdownTransform'
import SupportCesium from './plugins/supportCesium'

export const shared = defineConfig({
  title: 'Cesium Use',
  rewrites: {
    'docs/:markdown.md': ':markdown.md',
    'docs/:lang/:markdown.md': ':lang/:markdown.md',
    'core/:part/:module/index.md': ':part/:module.md',
    'core/:part/:module/index-zh.md': 'zh/:part/:module.md',
  },
  base: '/cesium-use/',
  head: [['link', { rel: 'icon', href: '/cesium-use/logo.webp' }]],
  markdown: {
    math: true,
  },
  vite: {
    publicDir: 'docs/public',
    plugins: [
      SupportCesium(),
      MarkdownTransform(),

      UnoCss(),
    ],
    server: {
      warmup: {
        clientFiles: ['./components/Viewer.vue'],
      },
    },
    resolve: {
      alias,
    },
    build: {
      rollupOptions: {
        external: ['cesium'],
        output: {
          globals: {
            cesium: 'Cesium',
          },
        },
      },
    },
  },
})
