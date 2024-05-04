# pickGlobePosition

以射线的方式获取椭球体上的坐标。

## 使用

```js{4}
// 通常可以结合 `useEvent` 使用

useEvent(({ position }) => {
  const pos = pickGlobePosition(position)
}, Cesium.ScreenSpaceEventType.LEFT_CLICK)
```

这种方式只会获取 `椭球体+地形`上的坐标，而会忽略tileset和模型等。

## 类型声明

::: details

```ts
function pickGlobePosition(position: Cartesian2): Cartesian3 | undefined
```

:::
