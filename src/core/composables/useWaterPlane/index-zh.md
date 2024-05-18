# useWaterPlane

::: warning 实验性功能
这是一项实验性功能。它不一定会最终成为稳定功能，并且在稳定之前相关 API 也可能会发生变化。
:::

拥有倒影的水面。

## 使用
```js
// 基本参数
const waterPrimitive = useWaterPlane({
  normalMapUrl: WaterImage,
  positions: positions.map(item => Cesium.Cartographic.fromDegrees(...item)),
  height: 10,
})

const form = reactive({
  height: 10,
  reflectivity: 0.15,
  rippleSize: 100,
  waterAlpha: 0.9,
  distortionScale: 10,
})
watchEffect(() => {
  waterPrimitive.height = form.height
  waterPrimitive.reflectivity = form.reflectivity
  waterPrimitive.rippleSize = form.rippleSize
  waterPrimitive.waterAlpha = form.waterAlpha
  waterPrimitive.distortionScale = form.distortionScale
})

// 显示与隐藏
function toggleShow() {
  waterPrimitive.show = !waterPrimitive.show
}

// 释放
function destroy() {
  waterPrimitive.destroy()
}
```
