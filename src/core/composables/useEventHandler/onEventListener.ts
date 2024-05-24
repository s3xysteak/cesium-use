import type * as Cesium from 'cesium'
import { tryOnScopeDispose } from '@vueuse/core'

export function onEventListener(event: Cesium.Event) {
  const hooks: Set<() => void> = new Set()

  const listener = event.addEventListener(() => {
    hooks.forEach(hook => hook())
  })

  tryOnScopeDispose(() => {
    listener()
    hooks.clear()
  })

  return hooks
}
