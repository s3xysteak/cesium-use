# toCoordinates

将坐标规范化为经纬度。

## 使用

```js
const { longitude, latitude, height } = toCoordinates(new Cartesian3())
const [lon, lat, alt] = toCoordinates(new Cartesian3())

const pos1 = toCoordinates(new Cartesian3())
const pos2 = toCoordinates([100, 20])
const pos3 = toCoordinates([100, 20, 10])
const pos4 = toCoordinates({
  longitude: 100,
  latitude: 20
})
const pos5 = toCoordinates({
  longitude: 100,
  latitude: 20,
  height: 10
})
```

## 类型声明

::: details

```ts
function toCoordinates(source: Cesium.Cartesian3 | MaybeCoordinates): {
  longitude: number
  latitude: number
  height: number | undefined
} & (number | undefined)[]
```

:::
