# useWaterPlane

拥有倒影的水面。

## 使用
```js
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

function toggleShow() {
  waterPrimitive.show = !waterPrimitive.show
}
```
