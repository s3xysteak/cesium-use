# editEntity

简化合并实体属性的操作，并且带有完整的类型提示。基于`Object.assign`实现，后面的选项会覆盖前面的选项。他拥有完整的类型提示，和无智能提示的手动操作相比，`editEntity`开发体验要好得多。

## 使用

```js
const entity = viewer.entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40])
  }
})

editEntity(
  entity,
  {
    polygon: {
      material: Cesium.Color.AQUA,
    },
  },
  {
    polygon: {
      material: Cesium.Color.RED,
    },
  },
)
// 这会将entity的材质改为红色
```
