import Theme from 'vitepress/theme'
import { h } from 'vue'
import Layout from './Layout.vue'
import 'virtual:uno.css'

import './vars.css'

export default {
  ...Theme,

  // Thanks to Unocss!
  Layout: () => h(Layout),
}
