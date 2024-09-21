import type * as Cesium from 'cesium'
import { createEventHook, tryOnScopeDispose } from '@vueuse/core'
import { useViewer } from '~composables/useViewer'
import { onEventHandler } from './onEventHandler'
import { onEventListener } from './onEventListener'

/**
 * If no params, similar to `Cesium.ScreenSpaceEventHandler`.
 * If passed `Cesium.Event`, used as a hook.
 *
 * The side effect will be collected to context of `useEventHandler` and be cleared on scope dispose.
 *
 * @example
 * ```js
 * const eventHandler = useEventHandler()
 * eventHandler(() => {
 *   // doSomething
 * }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
 *
 * const onPostRender = useEventHandler(viewer.scene.postRender)
 * onPostRender(() => {
 *   // doSomething
 * })
 * ```
 */
export function useEventHandler(): ReturnType<typeof onEventHandler>
export function useEventHandler(event: Cesium.Event): ReturnType<typeof onEventListener>
export function useEventHandler(event?: Cesium.Event) {
  const disposeHook = createEventHook()
  tryOnScopeDispose(() => disposeHook.trigger())

  return event
    ? onEventListener(event, disposeHook)
    : onEventHandler(useViewer(), disposeHook)
}
