import type * as Cesium from 'cesium'
import { createEventHook, tryOnScopeDispose } from '@vueuse/core'
import { onEventHandler } from './onEventHandler'
import { onEventListener } from './onEventListener'
import { useViewer } from '~composables/useViewer'

export function useEventHandler(): ReturnType<typeof onEventHandler>
export function useEventHandler(event: Cesium.Event): ReturnType<typeof onEventListener>
export function useEventHandler(event?: Cesium.Event) {
  const disposeHook = createEventHook()
  tryOnScopeDispose(() => disposeHook.trigger())

  return event
    ? onEventListener(event, disposeHook)
    : onEventHandler(useViewer(), disposeHook)
}
