# useWaterPlane

::: warning 实验性功能
这是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。
:::

拥有倒影的水面。

## 使用
```js
const waterPlane = useWaterPlane()

// 基本参数
const primitive = waterPlane({
  normalMapUrl: WaterImage,
  positions: positions.map(item => Cesium.Cartographic.fromDegrees(item[0], item[1])),
  height: 10,
})

const form = reactive({
  height: 10,
  reflectivity: 0.15,
  rippleSize: 100,
  waterColor: '#020E12',
  waterAlpha: 0.9,
  distortionScale: 10,
})
watchEffect(() => {
  primitive.height = form.height
  primitive.reflectivity = form.reflectivity
  primitive.rippleSize = form.rippleSize
  primitive.waterColor = defineColor(form.waterColor)
  primitive.waterAlpha = form.waterAlpha
  primitive.distortionScale = form.distortionScale
})

// 显示与隐藏
function toggleShow() {
  primitive.show = !primitive.show
}

// 释放
function destroy() {
  primitive.destroy()
}
```
