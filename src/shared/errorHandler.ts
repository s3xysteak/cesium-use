export function error(message: string): never {
  throw new Error(`[cesium-use] ${message}`)
}
