# useEventHandler

相当于`ScreenSpaceEventHandler`的简化，并且带有函数重载。
`useEventHandler`会试图自动在组件卸载时注销事件。如果当前上下文不在 setup 调用栈内，你可以通过其返回值手动注销事件。

如果传入`Cesium.Event`作为参数，则将创建事件，并且将会在组件卸载时自动注销事件。

## 使用

### ScreenSpaceEventHandler 的简化

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
}, Cesium.ScreenSpaceEventType.LEFT_CLICK) // 函数重载

// handler.destroy()
```

值得一提的是，建议在使用`eventHandler`时先提供第二个参数，也就是`ScreenSpaceEventType`。这会触发`eventHandler`的函数重载，以提供更好的类型提示。

### Cesium.Event

```js {1}
const eventListener = useEventHandler(viewer.scene.preRender)

function hook() {
  console.log('Call in preRender!')
}

eventListener.add(hook)
eventListener.has(hook)
eventListener.delete(hook)
eventListener.clear()
```

`useEventHandler(viewer.scene.preRender)` 返回一个 `Set`，其内部存放在preRender钩子中的回调函数。
