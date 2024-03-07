# useEvent

It serves as a simplified version of `ScreenSpaceEventHandler` with function overloading.  
`useEvent` will attempt to automatically unregister events when the component is unmounted. If the current context is not within the setup call stack, you can manually unregister events using its return value.

## Usage

```js {10}
const handler = useEvent(e => {
  viewer.entities.add({
    position: viewer.scene.pickPosition(e.position),
    point: {
      pixelSize: 30,
      outlineWidth: 10,
      color: Cesium.Color.fromRandom({ alpha: 1 })
    }
  })
}, Cesium.ScreenSpaceEventType.LEFT_CLICK) // Function overloading

// handler.destroy()
```

It is worth noting that when using `useEvent`, it is recommended to first provide the second parameter, which is `ScreenSpaceEventType`. This triggers function overloading in `useEvent` to offer better type hints.

## Type Declaration

:::details

```ts
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
```

:::
