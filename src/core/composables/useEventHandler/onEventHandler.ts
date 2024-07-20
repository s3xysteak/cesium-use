import * as Cesium from 'cesium'
import type { createEventHook } from '@vueuse/core'

export type SetInputActionArgs = Parameters<InstanceType<typeof Cesium.ScreenSpaceEventHandler>['setInputAction']>
export function onEventHandler(viewer: Cesium.Viewer, disposeHook: ReturnType<typeof createEventHook>) {
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

  // * Impl

  function eventHandler(...args: SetInputActionArgs): Cesium.ScreenSpaceEventHandler {
    const [action, type, modifier] = args

    const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

    handler.setInputAction(
      (e: any) => action(e),
      type,
      modifier,
    )

    disposeHook.on(() => handler.destroy())

    return handler
  }

  return eventHandler
}
