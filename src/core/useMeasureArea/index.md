# useMeasureArea

Measure area.

## Usage

```js
const { state, clearAll } = useMeasureArea({
  format: area => `Area: ${area.toFixed(2)} m²`
})
```

Start measuring when `state` is `true` , `Left_CLICK` to create new point, `LEFT_DOUBLE_CLICK` to end the measure. It use `editEntity` to merge constructor options of all entities.

Change label from `format` option.

## Type Declaration

::: details

```ts
interface UseMeasureAreaOptions {
  format?: (area: number) => string
  areaEntityProps?: Cesium.Entity.ConstructorOptions
  startEntityProps?: Cesium.Entity.ConstructorOptions
  turnEntityProps?: Cesium.Entity.ConstructorOptions
  endEntityProps?: Cesium.Entity.ConstructorOptions
  closeEntityProps?: Cesium.Entity.ConstructorOptions
  centerEntityProps?: Cesium.Entity.ConstructorOptions
}

interface AreaEntityData {
  /**
   * All entities in made by `UseMeasureAreaOptions`.
   */
  entities: ReturnType<typeof entityCollection>

  /**
   * Polygon positions.
   */
  positions: Cesium.Cartesian3[]
}

interface UseMeasureAreaReturn {
  /**
   * Whether the area measurement is in progress
   */
  state: Ref<boolean>

  /**
   * Current area measurement entity
   */
  current: ShallowRef<AreaEntityData | undefined>

  /**
   * All area measurement entities
   */
  set: Set<AreaEntityData>

  /**
   * Clear all area measurement entities
   */
  clearAll: () => void
}

function useMeasureArea(options?: UseMeasureAreaOptions): UseMeasureAreaReturn
```

:::
