import { defineConfig, presetUno, presetIcons, presetAttributify } from 'unocss'

import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  shortcuts: [['flex-center', 'items-center justify-center']],
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify({
      prefix: 'uno-'
    })
  ],
  transformers: [transformerDirectives()]
})
