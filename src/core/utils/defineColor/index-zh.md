# defineColor

简化使用 `Cesium.Color` 的方式，这几乎是其替代品。

## 使用

```js
const viewer = useViewer()
viewer.entities.add({
  polygon: {
    // ...
    material: defineColor('#334455/80') // 颜色为#334455，透明度0.8
  }
})
```

`defineColor`会根据 `/` 将字符串分割为两部分，后面部分被视为是透明度

```js
// Cesium.Color.fromCssColorString('rgb(255 0 0)')
defineColor('rgb(255 0 0)')

// Cesium.Color.fromCssColorString('rgb(255 0 0 / 0.8)')
defineColor('rgb(255 0 0 / 0.8)')

// Cesium.Color.fromCssColorString('pink')
defineColor('pink')

// Cesium.Color.fromCssColorString('pink').withAlpha(0.8)
defineColor('pink/80')

// Cesium.Color.fromCssColorString('#f00')
defineColor('#f00')

// Cesium.Color.fromCssColorString('#f00').withAlpha(0.8)
defineColor('#f00/80')
```
