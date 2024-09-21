# loadGeojson

In a declarative manner, load GeoJSON concisely.

## Usage

```js
async function load() {
  const dataSource = await loadGeojson({
    url: 'geojson/land.json',
    dataSourceOptions: { clampToGround: true },
    onEntity(entity) {
      const properties = entity.properties.getValue(Cesium.JulianDate.now())
      console.log(properties)
    }
  })

  // The function loadGeojson is a pure function, so you need to manually use it.
  viewer.dataSources.add(dataSource)
}

async function loadPrimitive() {
  const primitive = await loadGeojson({
    url: 'geojson/water.json',
    // loadGeojson return what custom() returns when set the custom callback.
    custom(dataSource) {
      // ...
      dataSource.entities.values.forEach((e) => {
        // ...
      })
      return primitive
    }
  })

  viewer.scene.primitives.add(primitive)
}
```

For `onEntity` and `custom`, you can use them through **methods** rather than through **arrow functions**:

```ts
loadGeojson({
  url: 'geojson/water.json',

  custom: (dataSource) => { // [!code --]
    console.log(this.url) // 'undefined' // [!code --]
  }, // [!code --]

  custom(dataSource) { // [!code ++]
    console.log(this.url) // 'geojson/water.json' // [!code ++]
  } // [!code ++]
})
```

This is useful when you need to access the local scope.
