export function throwError(message: string): never {
  throw new Error(`[cesium-use] ${message}`)
}

export function error(message: string) {
  console.error(`[cesium-use] ${message}`)
}

export function warn(message: string) {
  console.warn(`[cesium-use] ${message}`)
}
