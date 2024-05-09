import { readdirSync } from 'node:fs'
import { defineConfig } from 'vitepress'

const composablesList = readdirSync('./src/core/composables')
const componentsList = readdirSync('./src/core/components')
const utilsList = readdirSync('./src/core/utils')

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '优雅且简洁的解决方案',

  themeConfig: {
    logo: '/logo.webp',

    outline: {
      label: '页面导航',
    },
    nav: [
      { text: '主页', link: '/zh/' },
      { text: '安装', link: '/zh/usage' },
    ],

    sidebar: [
      {
        text: '开始',
        items: [
          { text: '简介', link: '/zh/intro' },
          { text: '安装', link: '/zh/usage' },
        ],
      },
      {
        text: '组合式函数',
        items: composablesList.map(dir => ({
          text: dir,
          link: `/zh/composables/${dir}.md`,
        })),
      },
      {
        text: '组件',
        items: componentsList.map(dir => ({
          text: dir,
          link: `/zh/components/${dir}.md`,
        })),
      },
      {
        text: '工具',
        items: utilsList.map(dir => ({
          text: dir,
          link: `/zh/utils/${dir}.md`,
        })),
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/s3xysteak/cesium-use' },
    ],
  },
})
