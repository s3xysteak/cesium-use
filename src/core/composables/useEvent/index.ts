import * as Cesium from 'cesium'
import { getCurrentInstance, onUnmounted } from 'vue'
import { useViewer } from '~composables/useViewer'

export type SetInputActionArgs = Parameters<
  InstanceType<typeof Cesium.ScreenSpaceEventHandler>['setInputAction']
>

export function useEvent(viewer = useViewer()) {
  function event(
    callback: Cesium.ScreenSpaceEventHandler.MotionEventCallback,
    type: Cesium.ScreenSpaceEventType.MOUSE_MOVE
  ): Cesium.ScreenSpaceEventHandler

  function event(
    callback: Cesium.ScreenSpaceEventHandler.PositionedEventCallback,
    type:
      | Cesium.ScreenSpaceEventType.LEFT_CLICK
      | Cesium.ScreenSpaceEventType.RIGHT_CLICK
      | Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  ): Cesium.ScreenSpaceEventHandler

  function event(
    ...args: SetInputActionArgs
  ): Cesium.ScreenSpaceEventHandler

  function event(...args: SetInputActionArgs): Cesium.ScreenSpaceEventHandler {
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

  return event
}
