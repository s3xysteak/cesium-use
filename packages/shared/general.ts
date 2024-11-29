import { isObject } from '@s3xysteak/utils'

/** merge in 2 depth */
export function mergeDeep<T extends object = object, S extends object = T>(obj: T, ...args: S[]) {
  return args.reduce((acc, arg) => {
    objectKeys(arg).forEach((key) => {
      if (isObject(arg[key]) && isObject((acc as any)[key]))
        Object.assign((acc as any)[key], arg[key])
      else
        (acc as any)[key] = arg[key]
    })
    return acc
  }, obj)
}

export function objectKeys<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[]
}
