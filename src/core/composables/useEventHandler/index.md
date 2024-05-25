# useEventHandler

It serves as a simplified version of `ScreenSpaceEventHandler` with function overloading.
`useEventHandler` will attempt to automatically unregister events when the component is unmounted. If the current context is not within the setup call stack, you can manually unregister events using its return value.

If a `Cesium.Event` is passed as a parameter, an event will be created, and it will automatically be unregistered when the component is unmounted.

## Usage

### A simplified version of ScreenSpaceEventHandler

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

It is worth noting that when using `eventHandler`, it is recommended to first provide the second parameter, which is `ScreenSpaceEventType`. This triggers function overloading in `eventHandler` to offer better type hints.

### Cesium.Event

```js {1}
const onPreRender = useEventHandler(viewer.scene.preRender)

onPreRender(() => {
  console.log('Call in preRender!')
})
const remove = onPreRender(() => {
  console.log('Call in preRender too!')
})

remove() // Unregister the callback hook. It returns true when remove successfully or false when failed.
```

`useEventHandler(viewer.scene.preRender)` Returns a callback hook, used to add callback functions.
