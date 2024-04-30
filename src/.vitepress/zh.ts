import { readdirSync } from 'node:fs'
import { defineConfig } from 'vitepress'

const coreList = readdirSync('./src/core')
const componentsList = readdirSync('./src/components')

export const zh = defineConfig({
  lang: 'zh-Hans',
  description: '优雅且简洁的解决方案',

  themeConfig: {
    logo: '/cesium-use.webp',

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
        text: '核心',
        items: coreList.map(dir => ({
          text: dir,
          link: `/zh/core/${dir}.md`,
        })),
      },
      {
        text: '组件',
        items: componentsList.map(dir => ({
          text: dir,
          link: `/zh/components/${dir}.md`,
        })),
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/s3xysteak/cesium-use' },
    ],
  },
})
