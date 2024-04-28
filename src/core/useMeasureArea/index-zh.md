# useMeasureArea

测面。

## 使用

```js
const { state, clearAll } = useMeasureArea({
  format: area => `Area: ${area.toFixed(2)} m²`
})
```

`state` 为 `true` 时开始测面，左键创建新的点，双击左键结束这次测面。内部通过 `editEntity` 合并各个点的构造参数。

通过 `format` 修改展示的文本内容。

## 类型声明

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
