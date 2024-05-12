import type { Entity } from 'cesium'
import { mergeDeep } from '~shared/general'

export function editEntity<T extends Entity | Entity.ConstructorOptions>(entity: T, ...args: Entity.ConstructorOptions[]): T {
  return mergeDeep(entity, ...args)
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe('editEntity', () => {
    const newEntity = (): Entity.ConstructorOptions => ({
      id: 'id',
      name: 'name',
    })

    it('should work basic', () => {
      expect(editEntity(newEntity(), { name: 'hi' })).toEqual({ id: 'id', name: 'hi' })
    })

    it('could add new property', () => {
      expect(editEntity(
        newEntity(),
        { label: { text: 'hi' } },
      )).toEqual({
        id: 'id',
        name: 'name',
        label: { text: 'hi' },
      })
    })

    it('could merge deep', () => {
      expect(editEntity(
        newEntity(),
        { label: { text: 'hi' } },
        { label: { font: 'bold' } },
        { label: { text: 'hi too' } },
      )).toEqual({
        id: 'id',
        name: 'name',
        label: { text: 'hi too', font: 'bold' },
      })
    })
  })
}
