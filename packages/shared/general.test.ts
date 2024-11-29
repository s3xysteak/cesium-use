import { describe, expect, it } from 'vitest'
import { mergeDeep } from './general'

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

  it('should merge multiple objects', () => {
    const obj1 = {
      a: 1,
      b: { c: 3 },
    }
    const obj2 = {
      a: 1,
      b: { c: 'three' },
      d: 4,
    }
    const obj3 = {
      a: 'one',
      b: { e: 'e' },
    }

    expect(mergeDeep(obj1, obj2, obj3 as any)).toEqual({
      a: 'one',
      b: { c: 'three', e: 'e' },
      d: 4,
    })
  })
})
