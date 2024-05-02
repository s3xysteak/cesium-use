# useMeasureHeight

Measure height.

## Usage

```js
const { state, clearAll } = useMeasureHeight()
```

Start measuring when `state` is `true`. Left click to pick the start point, double left click to pick the end point. It use `editEntity` to merge constructor options of all entities.

Obtain the height by calculating the projected coordinates.

## Type Declaration

::: details

```ts
interface UseMeasureHeightOptions {
  format?: (height: number) => string
  heightEntityProps?: Cesium.Entity.ConstructorOptions
  turnEntityProps?: Cesium.Entity.ConstructorOptions
  endEntityProps?: Cesium.Entity.ConstructorOptions
  closeEntityProps?: Cesium.Entity.ConstructorOptions
}

interface HeightEntityData {
  /**
   * All entities in made by `UseMeasureHeightOptions`.
   */
  entities: ReturnType<typeof entityCollection>

  /**
   * `[start, end]` positions.
   */
  positions: ShallowRef<Cesium.Cartesian3[]>

  turnPosition: Ref<Cesium.Cartesian3 | undefined>
}

interface UseMeasureHeightReturn {
  /**
   * Whether the height measurement is in progress
   */
  state: Ref<boolean>

  /**
   * Current height measurement entity
   */
  current: ShallowRef<HeightEntityData | undefined>

  /**
   * All height measurement entities
   */
  set: Set<HeightEntityData>

  /**
   * Clear all height measurement entities
   */
  clearAll: () => void
}

function useMeasureHeight(options?: UseMeasureHeightOptions): UseMeasureHeightReturn
```

:::
