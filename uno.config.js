import {
  defineConfig,
  presetUno,
  presetIcons,
  presetAttributify,
  toEscapedSelector as e
} from 'unocss'

import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify({
      prefix: 'uno-'
    })
  ],
  transformers: [transformerDirectives()]
})
