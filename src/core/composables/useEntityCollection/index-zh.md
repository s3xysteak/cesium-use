# useEntityCollection

与 Viewer 自动同步的 EntityCollection，本质上是 [linkEntityCollection](/zh/utils/linkEntityCollection.md) 的封装。

## 使用

```js
const collection = useEntityCollection()
// 这会同步到上下文的viewer，无需手动再执行viewer.entities.add()
collection.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40])
  }
})
```

`useEntityCollection` 会在内部通过`useViewer`获取 viewer 实例。
