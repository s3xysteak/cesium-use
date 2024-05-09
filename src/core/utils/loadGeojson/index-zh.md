# loadGeojson

以约定式的方式，简洁地加载 geojson。

## 使用

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

  // loadGeojson是一个无副作用函数，因此你需要手动添加这个geojson。
  viewer.dataSources.add(dataSource)
}

async function loadPrimitive() {
  const primitive = await loadGeojson({
    url: 'geojson/water.json',
    // 如果设置了custom回调，则loadGeojson返回custom()的返回值。
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

对于`onEntity`和`custom`，你可以通过**方法**去使用它，而不是通过**箭头函数**去使用它：

```ts
const primitive = await loadGeojson({
  url: 'geojson/water.json',

  custom: (dataSource) => { // [!code --]
    console.log(this.url) // 'undefined' // [!code --]
  }, // [!code --]

  custom(dataSource) { // [!code ++]
    console.log(this.url) // 'geojson/water.json' // [!code ++]
  } // [!code ++]
})
```

这在你需要访问自身作用域时是有用的。

## 类型声明

::: details

```ts
export interface LoadGeojsonConfig<CustomReturns = any> {
  url: Parameters<Cesium.GeoJsonDataSource['load']>[0]
  dataSourceOptions?: Parameters<Cesium.GeoJsonDataSource['load']>[1]
  onEntity?: (entity: Cesium.Entity) => void
  custom?: (dataSource: Cesium.GeoJsonDataSource) => CustomReturns
}

function loadGeojson<T extends LoadGeojsonConfig<any>>(
  config: T
): Promise<
  T['custom'] extends (...args: any[]) => infer R ? R : Cesium.GeoJsonDataSource
>
```

:::
