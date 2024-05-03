import type * as Cesium from 'cesium'

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
