import { h } from 'vue'
import Theme from 'vitepress/theme'
import Layout from './Layout.vue'
import 'virtual:uno.css'

import './vars.css'

export default {
  ...Theme,

  // Thanks to Unocss!
  Layout: () => h(Layout),
}
