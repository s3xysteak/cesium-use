import { defineConfig } from 'vitepress'

export const shared = defineConfig({
  title: 'Cesium Use',
  rewrites: {
    'docs/:markdown.md': ':markdown.md',
    'docs/:lang/:markdown.md': ':lang/:markdown.md',
    ':part/:module/index.md': ':part/:module.md',
    ':part/:module/index-zh.md': 'zh/:part/:module.md',
  },
  vite: {
    publicDir: 'docs/public',
  },
  base: '/cesium-use/',
  head: [['link', { rel: 'icon', href: '/cesium-use/cesium-use.webp' }]],
})
