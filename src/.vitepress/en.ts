import { readdirSync } from 'node:fs'
import { defineConfig } from 'vitepress'

const coreList = readdirSync('./src/core')
const componentsList = readdirSync('./src/components')

export const en = defineConfig({
  lang: 'en-US',
  description: 'Minimalism and elegant solution',

  themeConfig: {
    logo: '/cesium-use.svg',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Install', link: '/usage' },
    ],

    sidebar: [
      {
        text: 'Quick Start',
        items: [
          { text: 'Introduce', link: '/intro' },
          { text: 'Install', link: '/usage' },
        ],
      },
      {
        text: 'core',
        items: coreList.map(dir => ({
          text: dir,
          link: `core/${dir}.md`,
        })),
      },
      {
        text: 'component',
        items: componentsList.map(dir => ({
          text: dir,
          link: `components/${dir}.md`,
        })),
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/s3xysteak/cesium-use' },
    ],
  },
})
