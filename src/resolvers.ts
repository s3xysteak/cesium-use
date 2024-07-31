import type {  ComponentResolver } from 'unplugin-vue-components';

const list = ['Located']

export default function resolvers():ComponentResolver {
  const set = new Set(list)

  return {
    type: 'component',
    resolve: (name: string) => {
      if (set.has(name))
        return { name, from: 'cesium-use' }
    },
  }
}
