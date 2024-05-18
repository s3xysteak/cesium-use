# useWaterPlane

::: warning Experimental Feature
It is an experimental feature. It is not guaranteed to reach stable status and the API may change before it does.
:::

The water surface with reflections.

## Usage
```js
// Basic params.
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

// Show and hide
function toggleShow() {
  waterPrimitive.show = !waterPrimitive.show
}

// Destroy
function destroy() {
  waterPrimitive.destroy()
}
```
