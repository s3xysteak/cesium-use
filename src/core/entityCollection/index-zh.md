# entityCollection

与 Viewer 自动同步的 EntityCollection。

## 使用

```js
const collection = entityCollection()
// 这会同步到上下文的viewer，无需手动再执行viewer.entities.add()
collection.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40])
  }
})
```

`entityCollection` 会在内部通过`getViewer`获取 viewer 实例。

## 类型声明

::: details

```ts
// 与Cesium.EntityCollection的使用完全相同，只是重写了增删改查方法

export function entityCollection(...args: ConstructorParameters<typeof Cesium.EntityCollection>) {
  return new EntityCollection(...args)
}

class EntityCollection extends Cesium.EntityCollection {
  // ...
}
```

:::
