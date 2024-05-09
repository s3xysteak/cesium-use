import { readdirSync } from 'node:fs'
import { defineConfig } from 'vitepress'

const composablesList = readdirSync('./src/core/composables')
const componentsList = readdirSync('./src/core/components')
const utilsList = readdirSync('./src/core/utils')

export const en = defineConfig({
  lang: 'en-US',
  description: 'Minimalism and elegant solution',

  themeConfig: {
    logo: '/logo.webp',

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
        text: 'Composables',
        items: composablesList.map(dir => ({
          text: dir,
          link: `composables/${dir}.md`,
        })),
      },
      {
        text: 'Component',
        items: componentsList.map(dir => ({
          text: dir,
          link: `components/${dir}.md`,
        })),
      },
      {
        text: 'Utils',
        items: utilsList.map(dir => ({
          text: dir,
          link: `utils/${dir}.md`,
        })),
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/s3xysteak/cesium-use' },
    ],
  },
})
