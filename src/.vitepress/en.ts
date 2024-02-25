import { readdirSync } from 'node:fs'
import { defineConfig } from 'vitepress'

const coreList = readdirSync('./src/core')
const componentsList = readdirSync('./src/components')

export const en = defineConfig({
  lang: 'en-US',
  description: 'Minimalism and elegant solution',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'core',
        items: coreList.map(dir => ({
          text: dir,
          link: `core/${dir}.md`
        }))
      },
      {
        text: 'component',
        items: componentsList.map(dir => ({
          text: dir,
          link: `components/${dir}.md`
        }))
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
