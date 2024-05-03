import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'items-center justify-center'],
    ['btn', 'bg-light b-1 b-solid b-dark rounded p-2 transition hover:bg-gray-2'],
  ],
  presets: [
    presetUno(),
    presetIcons(),
    presetAttributify({
      prefix: 'uno-',
    }),
  ],
  transformers: [transformerDirectives()],
})
