# linkEntityCollection

> Keep on keeping on!

链接两个 `Cesium.EntityCollection` ，使原集合单向同步到目标集合。

## 使用

```js
const collection = new Cesium.EntityCollection()

linkEntityCollection(viewer.entities, collection)

const entity = collection.add({})
viewer.entities.contains(entity) // true!

collection.remove(entity)
viewer.entities.contains(entity) // false!

const entityOfTarget = viewer.entities.add({})
collection.contains(entityOfTarget) // false!
```

你也可以嵌套的链接 `Cesium.EntityCollection` ：

```js
const father = new Cesium.EntityCollection()

const son1 = new Cesium.EntityCollection()
const son2 = new Cesium.EntityCollection()

linkEntityCollection(father, son1)
linkEntityCollection(father, son2) // 也可以链接多个 EntityCollection。

linkEntityCollection(viewer.entities, father)

const e = son1.add({})
viewer.entities.contains(e) // true!
```

也可以调用其返回值以解除链接：

```js
const collection = new Cesium.EntityCollection()

const unlink = linkEntityCollection(viewer.entities, collection)

const e = collection.add({})
viewer.entities.contains(e) // true!

unlink()

collection.remove(e)
viewer.entities.contains(e) // still true!
```
