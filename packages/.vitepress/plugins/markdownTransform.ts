import type { Plugin } from 'vite'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { resolve } from 'pathe'

import { getTypeDeclaration } from '../utils'

function markdownTransform(): Plugin {
  const DIR_CORE = resolve(fileURLToPath(import.meta.url), '../../..')
  const DIR_TYPES = resolve(fileURLToPath(import.meta.url), '../../../../tsc-types/packages')
  const hasTypes = fs.existsSync(DIR_TYPES)

  if (!hasTypes)
    console.warn('No types dist found, run `pnpm build:types` first.')

  return {
    name: 'docs-md-transform',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.match(/packages\/(?:components|composables|utils)\/.+?\.md/))
        return

      const [pkg, name, i] = id.split('/').slice(-3)
      const lang = langMap(i.split('-')[1]?.replace(/\.md$/, '') ?? 'en')!

      // replace
      code = code.replace(varMap('experimental')!, lang.experimental)

      // demo
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

      const URL = 'https://github.com/s3xysteak/cesium-use/blob/main/packages'
      const existsIndex = fs.existsSync(`${DIR_CORE}/${pkg}/${name}/index.ts`)

      const sourceUrl = `${URL}/${pkg}/${name}/index.${existsIndex ? 'ts' : 'vue'}`

      // ## Source

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
      experimental: `
::: warning Experimental Feature
It is an experimental feature. It is not guaranteed to reach stable status and the API may change before it does.
:::
      `.trim(),
    },
    zh: {
      type: '类型声明',
      source: '源码',
      experimental: `
::: warning 实验性功能
这是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。
:::
      `.trim(),
    },
  }[lang]
}

function varMap(varKey: string) {
  return {
    experimental: '::experimental::',
  }[varKey]
}
