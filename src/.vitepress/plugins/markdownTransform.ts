import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { resolve } from 'pathe'
import type { Plugin } from 'vite'

import { getTypeDeclaration } from '../utils'

export function markdownTransform(): Plugin {
  const DIR_CORE = resolve(fileURLToPath(import.meta.url), '../../../core')
  const DIR_TYPES = resolve(fileURLToPath(import.meta.url), '../../../../tsc-types/src/core')
  const hasTypes = fs.existsSync(DIR_TYPES)

  if (!hasTypes)
    console.warn('No types dist found, run `pnpm build:types` first.')

  return {
    name: 'docs-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/.+?core\/.+?\.md\b/))
        return

      const [pkg, name, i] = id.split('/').slice(-3)
      const lang = langMap(i.split('-')[1]?.replace(/\.md$/, '') ?? 'en')

      const types = await getTypeDeclaration(pkg, name)

      const URL = 'https://github.com/s3xysteak/cesium-use/blob/main/src/core'

      const existDemo = fs.existsSync(`${DIR_CORE}/${pkg}/${name}/demo.vue`)

      const existsIndex = fs.existsSync(`${DIR_CORE}/${pkg}/${name}/index.ts`)

      return `${code}
${types
? `
## ${lang?.type}

::: details

\`\`\`ts
${types}
\`\`\`

:::
`
: ''}
## ${lang?.source}

[source](${`${URL}/${pkg}/${name}/index.${existsIndex ? 'ts' : 'vue'}`})${existDemo ? ` • [demo](${`${URL}/core/${pkg}/${name}/demo.vue`})` : ''}`
    },
  }
}

function langMap(lang: string) {
  return {
    en: {
      type: 'Type Declarations',
      source: 'Source',
    },
    zh: {
      type: '类型声明',
      source: '源码',
    },
  }[lang]
}
