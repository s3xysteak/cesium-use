# useWaterPlane

::experimental::

The water surface with reflections.

## Usage
```js
const waterPlane = useWaterPlane()

// Basic params.
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

// Show and hide
function toggleShow() {
  primitive.show = !primitive.show
}

// Destroy
function destroy() {
  primitive.destroy()
}
```
