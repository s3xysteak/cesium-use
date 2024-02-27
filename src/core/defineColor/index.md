# defineColor

Simplify the usage of Cesium.Color, as it's practically its substitute.

## Usage

```js
const viewer = getViewer()
viewer.entities.add({
  polygon: {
    // ...
    material: defineColor('#334455/80') // Color is #334455，transparency is 0.8
  }
})
```

The `defineColor` function will split the string into two parts based on `/`, with the latter part considered as the opacity.

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

## Type Declaration

::: details

```ts
export const defineColor = (str: string): Cesium.Color
```

:::
