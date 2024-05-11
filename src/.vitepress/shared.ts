import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'
import { extname, normalize, resolve } from 'pathe'

import UnoCss from 'unocss/vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

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
      viteStaticCopy(copyCesium(['Assets/*', 'ThirdParty/*', 'Widgets/*', 'Workers/*', 'index.js'])),
    ],
    server: {
      warmup: {
        clientFiles: ['./components/Viewer.vue'],
      },
    },
    ssr: {
      external: ['cesium'],
    },
    resolve: {
      alias,
    },
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
