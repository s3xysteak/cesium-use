import * as Cesium from 'cesium'
import { describe, expect, it } from 'vitest'
import { syncEntityCollection } from '.'

describe.concurrent('syncEntityCollection', () => {
  const prepare = () => [
    new Cesium.EntityCollection(),
    new Cesium.EntityCollection(),
  ]

  it('should work with add by source', () => {
    const [target, source] = prepare()

    syncEntityCollection(target, source)

    const e = source.add({})
    expect(target.contains(e)).toBe(true)
  })

  it('should work with add by default param', () => {
    const [target] = prepare()

    const source = syncEntityCollection(target)

    const e = source.add({})
    expect(target.contains(e)).toBe(true)
  })

  it('should work with remove by source', () => {
    const [target, source] = prepare()

    syncEntityCollection(target, source)

    const e = source.add({})
    source.remove(e)

    expect(target.contains(e)).toBe(false)
  })

  it('should work with removeAll by source', () => {
    const [target, source] = prepare()

    syncEntityCollection(target, source)

    const e = source.add({})
    source.removeAll()

    expect(target.contains(e)).toBe(false)
  })

  it('should work with multiple entity collections', () => {
    const target = new Cesium.EntityCollection()

    const source1 = syncEntityCollection(target, new Cesium.EntityCollection())
    const source2 = syncEntityCollection(source1, new Cesium.EntityCollection())

    const e = source2.add({})

    expect(source1.contains(e)).toBe(true)
    expect(target.contains(e)).toBe(true)
  })
})
