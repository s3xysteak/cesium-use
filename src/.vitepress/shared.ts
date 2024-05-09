import { defineConfig } from 'vitepress'
import { markdownTransform } from './plugins/markdownTransform'

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
      markdownTransform(),
    ],
  },
})
