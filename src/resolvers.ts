const list = ['Located']

export default function resolvers() {
  const set = new Set(list)

  return {
    type: 'component',
    resolve: (name: string) => {
      if (set.has(name))
        return { name, from: 'cesium-use' }
    },
  }
}
