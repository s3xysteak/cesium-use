# usePrimitiveCollection

类似于 [useEntityCollection](/zh/composables/useEntityCollection)，但是返回一个 `PrimitiveCollection`。

## 使用

默认情况下，与上下文中的 `viewer.scene.primitives` 同步：

```js
const primitives = usePrimitiveCollection()
// 组件销毁时自动卸载primitives
```

你也可以手动传入一个 `PrimitiveCollection` 作为同步的目标：

```js
const collection = new Cesium.PrimitiveCollection()
usePrimitiveCollection(collection)
```
