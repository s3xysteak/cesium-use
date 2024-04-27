# useMeasureDistance

测距

## 使用

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

`state` 为 `true` 时开始测距，左键创建新的点，双击左键结束这次测距。内部通过 `editEntity` 合并各个点的构造参数。

测量的距离是两个点之间的直线距离。

## 类型声明

::: details

```ts
interface UseMeasureDistanceOptions {
  lineEntityProps?: Cesium.Entity.ConstructorOptions
  startEntityProps?: Cesium.Entity.ConstructorOptions
  turnEntityProps?: Cesium.Entity.ConstructorOptions
  endEntityProps?: Cesium.Entity.ConstructorOptions
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
