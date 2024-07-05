import { makeDestructurable } from '@vueuse/core'
import type { Entity } from 'cesium'

export function createEntityMeta<T = any>(_temp?: T) {
  const metaSymbol = Symbol('createEntityMeta')

  const set = (entity: Entity, meta: T) =>
    Object.defineProperty(entity, metaSymbol, {
      value: meta,
      writable: true,
      enumerable: true,
      configurable: true,
    })

  // @ts-expect-error metaSymbol is private
  const get = (entity: Entity) => entity[metaSymbol] as T

  return makeDestructurable(
    { setEntityMeta: set, getEntityMeta: get } as const,
    [set, get] as const,
  )
}
