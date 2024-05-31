import * as Cesium from 'cesium'
import { describe, expect, it } from 'vitest'
import { linkEntityCollection } from '.'

describe.concurrent('linkEntityCollection', () => {
  const prepare = () => [
    new Cesium.EntityCollection(),
    new Cesium.EntityCollection(),
  ]

  it('should work with add by source', () => {
    const [target, source] = prepare()

    linkEntityCollection(target, source)

    const e = source.add({})
    expect(target.contains(e)).toBe(true)
  })

  it('should work with remove by source', () => {
    const [target, source] = prepare()

    linkEntityCollection(target, source)

    const e = source.add({})
    source.remove(e)

    expect(target.contains(e)).toBe(false)
  })

  it('should work with removeAll by source', () => {
    const [target, source] = prepare()

    linkEntityCollection(target, source)

    const e = source.add({})
    source.removeAll()

    expect(target.contains(e)).toBe(false)
  })

  it('should work with multiple entity collections', () => {
    const target = new Cesium.EntityCollection()
    const [source1, source2] = prepare()

    linkEntityCollection(target, source1)
    linkEntityCollection(source1, source2)

    const e = source2.add({})

    expect(source1.contains(e)).toBe(true)
    expect(target.contains(e)).toBe(true)
  })
})
