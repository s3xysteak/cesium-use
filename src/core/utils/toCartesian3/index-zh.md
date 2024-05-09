# toCartesian3

将坐标规范化为 `Cartesian3` 。

## 使用

```js
const pos1 = toCartesian3(new Cartesian3())
const pos2 = toCartesian3([100, 20])
const pos3 = toCartesian3([100, 20, 10])
const pos4 = toCartesian3({
  longitude: 100,
  latitude: 20
})
const pos5 = toCartesian3({
  longitude: 100,
  latitude: 20,
  height: 10
})
```

## 类型声明

::: details

```ts
function toCartesian3(source: Cesium.Cartesian3 | MaybeCoordinates): Cesium.Cartesian3
```

:::
