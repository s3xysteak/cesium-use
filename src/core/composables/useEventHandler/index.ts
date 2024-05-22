import * as Cesium from 'cesium'
import { tryOnScopeDispose } from '@vueuse/core'
import { getCurrentInstance, onUnmounted } from 'vue'
import { useViewer } from '~composables/useViewer'

export type SetInputActionArgs = Parameters<
  InstanceType<typeof Cesium.ScreenSpaceEventHandler>['setInputAction']
>

export type UseEventHandlerParam = 'preRender' | 'postRender' | 'preUpdate' | 'postUpdate'

export function useEventHandler(): ReturnType<typeof onEventHandler>
export function useEventHandler(param: UseEventHandlerParam): ReturnType<typeof onEventListener>
export function useEventHandler(param?: UseEventHandlerParam) {
  const viewer = useViewer()

  return param ? onEventListener(viewer, param) : onEventHandler(viewer)
}

function onEventHandler(viewer: Cesium.Viewer) {
  function eventHandler(
    callback: Cesium.ScreenSpaceEventHandler.MotionEventCallback,
    type: Cesium.ScreenSpaceEventType.MOUSE_MOVE
  ): Cesium.ScreenSpaceEventHandler

  function eventHandler(
    callback: Cesium.ScreenSpaceEventHandler.PositionedEventCallback,
    type:
      | Cesium.ScreenSpaceEventType.LEFT_CLICK
      | Cesium.ScreenSpaceEventType.RIGHT_CLICK
      | Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  ): Cesium.ScreenSpaceEventHandler

  function eventHandler(
    ...args: SetInputActionArgs
  ): Cesium.ScreenSpaceEventHandler

  function eventHandler(...args: SetInputActionArgs): Cesium.ScreenSpaceEventHandler {
    const [action, type, modifier] = args

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

    handler.setInputAction(
      (e: any) => {
        action(e)
      },
      type,
      modifier,
    )

    getCurrentInstance()
    && onUnmounted(() => {
      handler.destroy()
    })

    return handler
  }

  return eventHandler
}

function onEventListener(viewer: Cesium.Viewer, param: UseEventHandlerParam) {
  const hooks: Set<() => void> = new Set()
  const listener = viewer.scene[param].addEventListener(() => {
    hooks.forEach(hook => hook())
  })

  tryOnScopeDispose(() => {
    viewer.scene[param].removeEventListener(listener)
    hooks.clear()
  })

  return hooks
}
