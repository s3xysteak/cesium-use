import type { ComponentResolver } from 'unplugin-vue-components'

/** Automatically generate by `/plugins/resolvers.ts` */
const LIST: Array<string> = []

export default function resolvers(): ComponentResolver {
  const set = new Set(LIST)

  return {
    type: 'component',
    resolve: (name: string) => {
      if (set.has(name))
        return { name, from: 'cesium-use' }
    },
  }
}
