import { fileURLToPath } from 'node:url'
import { extname, normalize, resolve } from 'pathe'
import UnoCss from 'unocss/vite'

import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig } from 'vitepress'

import alias from '../../alias'

import MarkdownTransform from './plugins/markdownTransform'
import SupportCesium from './plugins/supportCesium'

export const shared = defineConfig({
  title: 'Cesium Use',
  rewrites: {
    'docs/:markdown.md': ':markdown.md',
    'docs/:lang/:markdown.md': ':lang/:markdown.md',
    ':part/:module/index.md': ':part/:module.md',
    ':part/:module/index-zh.md': 'zh/:part/:module.md',
  },
  base: '/cesium-use/',
  head: [['link', { rel: 'icon', href: '/cesium-use/logo.png' }]],
  markdown: {
    math: true,
  },
  vite: {
    publicDir: 'docs/public',
    plugins: [
      SupportCesium(),
      MarkdownTransform(),

      UnoCss(),
      viteStaticCopy(copyCesium(['Assets/*', 'ThirdParty/*', 'Widgets/*', 'Workers/*', 'index.js'])),
    ],
    server: {
      warmup: {
        clientFiles: [resolve(fileURLToPath(import.meta.url), '../components/Viewer.vue')],
      },
    },
    ssr: {
      external: ['cesium'],
    },
    resolve: {
      alias,
    },
    envDir: resolve(fileURLToPath(import.meta.url), '..'),
    build: {
      rollupOptions: {
        external: ['cesium'],
        output: {
          paths: {
            cesium: '/cesium-use/cesium-package/index.js',
          },
        },
      },
    },
  },
})

function copyCesium(items: string[]) {
  return {
    targets: [
      ...items.map(item => ({
        src: normalize(resolve(fileURLToPath(import.meta.url), '../../../node_modules/cesium/Build/Cesium/'.concat(item))),
        dest: `cesium-package/${extname(item) ? '' : `${item.replace('*', '')}/`}`,
      })),
    ],
  }
}
