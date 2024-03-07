# flyToArea

基于`flyToBoundingSphere`将视角移动到刚好能看到所有输入坐标的位置。

## 使用

```js
flyToArea([[100, 20], ['120', 40], Cesium.Cartesian3.fromDegrees(110, 30)], {
  onSingle: () => flyTo(id),
  onEmpty: () => initCamera()
})
```

默认情况下，数组中无数据时不进行任何操作，只有单个数据时会飞行到俯视角位置。

## 类型声明

::: details

```ts
export interface FlyToAreaOptions {
  onSingle: () => void
  onEmpty: () => void
}

function flyToArea(
  posList: maybeCartesian3OrLonLat[],
  options?: Partial<FlyToAreaOptions>
): void
```

:::
