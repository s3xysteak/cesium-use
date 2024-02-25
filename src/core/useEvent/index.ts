import * as Cesium from 'cesium'
import { getCurrentInstance, onUnmounted } from 'vue'

export type SetInputActionArgs = Parameters<
  InstanceType<typeof Cesium.ScreenSpaceEventHandler>['setInputAction']
>

export function useEvent(
  callback: Cesium.ScreenSpaceEventHandler.MotionEventCallback,
  type: Cesium.ScreenSpaceEventType.MOUSE_MOVE
): Cesium.ScreenSpaceEventHandler

export function useEvent(
  callback: Cesium.ScreenSpaceEventHandler.PositionedEventCallback,
  type:
    | Cesium.ScreenSpaceEventType.LEFT_CLICK
    | Cesium.ScreenSpaceEventType.RIGHT_CLICK
): Cesium.ScreenSpaceEventHandler

export function useEvent(
  ...args: SetInputActionArgs
): Cesium.ScreenSpaceEventHandler

export function useEvent(
  ...args: SetInputActionArgs
): Cesium.ScreenSpaceEventHandler {
  const [action, type, modifier] = args

  const viewer = getViewer()
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)

  handler.setInputAction(
    (e: any) => {
      action(e)
    },
    type,
    modifier
  )

  getCurrentInstance() &&
    onUnmounted(() => {
      handler.destroy()
    })

  return handler
}
