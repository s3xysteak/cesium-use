import type * as Cesium from 'cesium'
import type { createEventHook } from '@vueuse/core'

export function onEventListener(event: Cesium.Event, disposeHook: ReturnType<typeof createEventHook>) {
  const hooks: Set<(...args: any[]) => void> = new Set()

  const listener = event.addEventListener(() => {
    hooks.forEach(hook => hook())
  })

  disposeHook.on(() => {
    listener()
    hooks.clear()
  })

  return (fn: (...args: any[]) => void) => {
    hooks.add(fn)

    return () => hooks.delete(fn)
  }
}
