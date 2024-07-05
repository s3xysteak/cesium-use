import { describe, expect, expectTypeOf, it } from 'vitest'
import { Entity } from 'cesium'
import { createEntityMeta } from '.'

describe.concurrent('createEntityMeta', () => {
  it('basic', () => {
    const [s, g] = createEntityMeta()
    const e = new Entity()
    s(e, 123)
    expect(g(e)).toBe(123)
  })

  it('basic types', () => {
    const [s, g] = createEntityMeta<number>()

    expectTypeOf(s).parameters.toEqualTypeOf<[Entity, number]>()

    expectTypeOf(g).parameters.toEqualTypeOf<[Entity]>()
    expectTypeOf(g).returns.toEqualTypeOf<number>()
  })

  it('complex types', () => {
    interface Options {
      one: number
      two: {
        hello: string
      }
    }

    const [s, g] = createEntityMeta<Options>()

    expectTypeOf(s).parameters.toEqualTypeOf<[Entity, Options]>()

    expectTypeOf(g).parameters.toEqualTypeOf<[Entity]>()
    expectTypeOf(g).returns.toEqualTypeOf<Options>()
  })
})
