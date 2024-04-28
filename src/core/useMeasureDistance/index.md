# useMeasureDistance

Measure distance.

## Usage

```js
const { state, clearAll } = useMeasureDistance({
  lineEntityProps: {
    polyline: {
      width: 2,
      material: Cesium.Color.ORANGE,
    },
  },
})
```

Start measuring when `state` is `true` , `Left_CLICK` to create new point, `LEFT_DOUBLE_CLICK` to end the measure. It use `editEntity` to merge constructor options of all entities.

The measured distance is the straight-line distance between two points.

## Type Declaration

::: details

```ts
interface UseMeasureDistanceOptions {
  lineEntityProps?: Cesium.Entity.ConstructorOptions
  startEntityProps?: Cesium.Entity.ConstructorOptions
  turnEntityProps?: Cesium.Entity.ConstructorOptions
  endEntityProps?: Cesium.Entity.ConstructorOptions
  closeEntityProps?: Cesium.Entity.ConstructorOptions
}

interface LineEntityData {
  /**
   * All entities in made by `UseMeasureDistanceOptions`.
   */
  entities: ReturnType<typeof entityCollection>

  /**
   * Polyline positions.
   */
  positions: Cesium.Cartesian3[]
}

interface UseMeasureDistanceReturn {
  /**
   * Whether the distance measurement is in progress
   */
  state: Ref<boolean>

  /**
   * Current distance measurement entity
   */
  current: ShallowRef<LineEntityData | undefined>

  /**
   * All distance measurement entities
   */
  set: Set<LineEntityData>

  /**
   * Clear all distance measurement entities
   */
  clearAll: () => void
}

function useMeasureDistance(options?: UseMeasureDistanceOptions): UseMeasureDistanceReturn
```

:::
