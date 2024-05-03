import type * as Cesium from 'cesium'

export function toTypeString(value: unknown): string {
  return Object.prototype.toString.call(value)
}

export function isUndefined(val: unknown): val is undefined {
  return typeof val === 'undefined'
}

export const isArray = Array.isArray

export function isMap(val: unknown): val is Map<any, any> {
  return toTypeString(val) === '[object Map]'
}

export function isSet(val: unknown): val is Set<any> {
  return toTypeString(val) === '[object Set]'
}

export function isDate(val: unknown): val is Date {
  return toTypeString(val) === '[object Date]'
}

export function isRegExp(val: unknown): val is RegExp {
  return toTypeString(val) === '[object RegExp]'
}

export function isFunction(val: unknown): val is Function {
  return typeof val === 'function'
}

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export function isObject(val: unknown): val is Record<any, any> {
  return val !== null && typeof val === 'object'
}

export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    (isObject(val) || isFunction(val))
    && isFunction((val as any).then)
    && isFunction((val as any).catch)
  )
}

/**
 * Get nth item of Array. Negative for backward
 *
 * @category Array
 */
export function at(array: readonly [], index: number): undefined
export function at<T>(array: readonly T[], index: number): T
export function at<T>(array: readonly T[] | [], index: number): T | undefined {
  const len = array.length
  if (!len)
    return undefined

  if (index < 0)
    index += len

  return array[index]
}

/** merge in 2 depth */
export function mergeDeep<T extends object = object, S extends object = T>(obj: T, ...args: S[]) {
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

export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}

export function pickGlobePosition(position: Cesium.Cartesian2) {
  const viewer = getViewer()

  const ray = viewer.camera.getPickRay(position)

  return viewer.scene.globe.pick(ray!, viewer.scene)
}
