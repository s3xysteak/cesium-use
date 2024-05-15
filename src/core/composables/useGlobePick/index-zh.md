# useGlobePick

以射线的方式获取椭球体上的坐标。

## 使用

```js{3}
// 通常可以结合 `useEventHandler` 使用

const globePick = useGlobePick()

useEventHandler(({ position }) => {
  const pos = globePick(position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

这种方式只会获取 `椭球体 + 地形`上的坐标，而会忽略tileset和模型等。
