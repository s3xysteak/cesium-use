# useEntityCollection

基于 [syncEntityCollection](/zh/utils/syncEntityCollection.md) 实现，这将会返回一个新创建的、与 `viewer.entities` 同步的 `EntityCollection`，并在离开上下文时自动清空。

因为其使用场景如此广泛，于是有了这个简单的封装。

## 使用

基本使用：

```ts
const entities = useEntityCollection()
// 同步到 `viewer.entities`
entities.add({
  position: toCartesian3(113, 22, 1000),
  point: {
    pixelSize: 1000,
  },
})
// 组件销毁时自动清空
```

你可以手动传入一个 `entities` 作为同步的目标：

```ts
const viewer = useViewer()
const scope = effectScope() // 提供一个作用域方便其自动卸载副作用

function load() {
  scope.run(() => {
    useEntityCollection(viewer.entities)
  })
}
```
