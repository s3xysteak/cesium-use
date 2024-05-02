# useMeasureHeight

测高

## 使用

```js
const { state, clearAll } = useMeasureHeight()
```

`state` 为 `true` 时开始测高，左键选择起点，双击左键选择终点。内部通过 `editEntity` 合并各个点的构造参数。

通过计算投影坐标来获得高度。

## 类型声明

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
