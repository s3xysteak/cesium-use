import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { resolve } from 'pathe'
import type { Plugin } from 'vite'

import { getTypeDeclaration } from '../utils'

function markdownTransform(): Plugin {
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

      const existDemo = fs.existsSync(`${DIR_CORE}/${pkg}/${name}/demo.vue`)
      code += existDemo
        ? `
<script setup>
import { defineAsyncComponent } from 'vue'
const Viewer = defineAsyncComponent(() => import('${resolve(fileURLToPath(import.meta.url), '../../components/Viewer.vue')}'))
const Demo = defineAsyncComponent(() => import('${DIR_CORE}/${pkg}/${name}/demo.vue'))
</script>

## demo

<ClientOnly>
  <Suspense>
    <Viewer>
      <Demo />
    </Viewer>
    <template #fallback>
      Loading...
    </template>
  </Suspense>
</ClientOnly>
`
        : ''

      const types = await getTypeDeclaration(pkg, name)

      // types
      code += types
        ? `
## ${lang?.type}

::: details

\`\`\`ts
${types}
\`\`\`

:::`
        : ''

      const URL = 'https://github.com/s3xysteak/cesium-use/blob/main/src/core'
      const existsIndex = fs.existsSync(`${DIR_CORE}/${pkg}/${name}/index.ts`)

      const sourceUrl = `${URL}/${pkg}/${name}/index.${existsIndex ? 'ts' : 'vue'}`

      // source
      code += `
## ${lang?.source}

[source](${sourceUrl})`

      // demo
      code += existDemo ? ` • [demo](${`${URL}/${pkg}/${name}/demo.vue`})` : ''

      return code
    },
  }
}

export default markdownTransform

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
