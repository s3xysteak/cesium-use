import type { Plugin } from 'vite'
import fs from 'node:fs/promises'
import process from 'node:process'

import { resolve } from 'pathe'

export default function (): Plugin {
  return {
    name: 'cesium-use/handle-resolvers',
    enforce: 'pre',
    async transform(code, id) {
      if (!id.endsWith('/src/resolvers.ts'))
        return

      const val = await fs.readdir(resolve(process.cwd(), './src/core/components'))

      const start = code.indexOf('[', code.indexOf('LIST'))
      const end = code.indexOf(']', start + 1)

      return `${code.substring(0, start)}${JSON.stringify(val)}${code.substring(end + 1)}`
    },
  }
}
