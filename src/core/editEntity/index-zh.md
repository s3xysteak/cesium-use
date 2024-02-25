# editEntity

简化合并实体属性的操作，并且带有完整的类型提示。基于`Object.assign`实现，后面的选项会覆盖前面的选项。  
目前支持 `point`， `polygon`， `polyline`。

## 使用

```js
const entity = viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40])
  }
})

editEntity.polygon(
  entity,
  { material: Cesium.Color.AQUA },
  { material: Cesium.Color.RED }
)
// 这会将entity的材质改为红色
```

## 类型声明

::: details

```ts
export const editEntity: {
  point: (entity: Entity, ...args: PointGraphics.ConstructorOptions[]): void

  polyline: (
    entity: Entity,
    ...args: PolylineGraphics.ConstructorOptions[]
  ): void

  polygon: (
    entity: Entity,
    ...args: PolygonGraphics.ConstructorOptions[]
  ): void
}
```

:::
