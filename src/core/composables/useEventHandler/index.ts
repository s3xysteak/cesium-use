import type * as Cesium from 'cesium'
import { onEventHandler } from './onEventHandler'
import { onEventListener } from './onEventListener'
import { useViewer } from '~composables/useViewer'

export function useEventHandler(): ReturnType<typeof onEventHandler>
export function useEventHandler(event: Cesium.Event): ReturnType<typeof onEventListener>
export function useEventHandler(event?: Cesium.Event) {
  return event ? onEventListener(event) : onEventHandler(useViewer())
}
