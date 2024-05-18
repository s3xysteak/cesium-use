import { defineConfig, presetAttributify, presetIcons, presetUno } from 'unocss'

import transformerDirectives from '@unocss/transformer-directives'

export default defineConfig({
  shortcuts: [
    ['flex-center', 'items-center justify-center'],
    ['btn', 'bg-light cursor-pointer dark:bg-dark dark:hover:bg-slate-7 b-1 b-solid b-dark rounded p-2 transition hover:bg-gray-2'],
    ['input', 'bg-light dark:bg-dark b-1 b-solid b-dark px-2 rounded'],
    ['panel-absolute', 'panel absolute top-4 left-4'],
    ['panel', 'bg-light dark:bg-dark rounded p-2'],
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
