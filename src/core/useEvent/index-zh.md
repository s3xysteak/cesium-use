# useEvent

相当于`ScreenSpaceEventHandler`的简化，并且带有函数重载。
`useEvent`会试图自动在组件卸载时注销事件。如果当前上下文不在 setup 调用栈内，你可以通过其返回值手动注销事件。

## 使用

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
}, Cesium.ScreenSpaceEventType.LEFT_CLICK) // 函数重载

// handler.destroy()
```

值得一提的是，建议在使用`useEvent`时先提供第二个参数，也就是`ScreenSpaceEventType`。这会触发`useEvent`的函数重载，以提供更好的类型提示。

## 类型声明

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
