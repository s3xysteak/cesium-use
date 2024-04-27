import type { Entity } from 'cesium'
import { isObject } from '@/shared/general'

export function editEntity(entity: Entity, ...args: Entity.ConstructorOptions[]): Entity {
  return mergeDeep(entity, ...args)
}

/** merge in 2 depth */
function mergeDeep<T extends object = object, S extends object = T>(obj: T, ...args: S[]) {
  return args.reduce((acc, arg) => {
    objectKeys(arg).forEach((key) => {
      // @ts-expect-error - key
      if (isObject(arg[key]) && isObject(acc[key]))
        // @ts-expect-error - key
        Object.assign(acc[key], arg[key])
      else
        // @ts-expect-error - key
        acc[key] = arg[key]
    })
    return acc
  }, obj)
}

function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe('mergeDeep', () => {
    it('should work', () => {
      const obj1 = {
        a: 1,
        b: true,
        c: {
          d: 4,
          e: 'e',
        },
      }
      const obj2 = {
        a: 'one',
        c: {
          d: 'four',
        },
        f: 6,
      }

      expect(mergeDeep(obj1, obj2)).toEqual({
        a: 'one',
        b: true,
        c: {
          d: 'four',
          e: 'e',
        },
        f: 6,
      })
    })

    it('should ignore depth bigger than 2', () => {
      const obj1 = {
        a: {
          b: {
            c: {
              d: 4,
            },
          },
        },
      }
      const obj2 = {
        a: {
          b: {
            one: 1,
            two: 2,
          },
        },
      }

      expect(mergeDeep(obj1, obj2)).toEqual({
        a: {
          b: {
            one: 1,
            two: 2,
          },
        },
      })
    })
  })
}
