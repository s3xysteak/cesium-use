# useEventHandler

It serves as a simplified version of `ScreenSpaceEventHandler` with function overloading.
`useEventHandler` will attempt to automatically unregister events when the component is unmounted. If the current context is not within the setup call stack, you can manually unregister events using its return value.

## Usage

```js {12}
const eventHandler = useEventHandler()

const handler = eventHandler((e) => {
  viewer.entities.add({
    position: viewer.scene.pickPosition(e.position),
    point: {
      pixelSize: 30,
      outlineWidth: 10,
      color: Cesium.Color.fromRandom({ alpha: 1 })
    }
  })
}, Cesium.ScreenSpaceEventType.LEFT_CLICK) // overloads

// handler.destroy()
```

It is worth noting that when using `useEventHandler`, it is recommended to first provide the second parameter, which is `ScreenSpaceEventType`. This triggers function overloading in `useEventHandler` to offer better type hints.