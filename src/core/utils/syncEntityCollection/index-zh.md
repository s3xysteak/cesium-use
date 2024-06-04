# syncEntityCollection

同步两个 `Cesium.EntityCollection` ，使原集合**单向**同步到目标集合。

## 使用

在下面的例子中，对 `collection` 的新增和删除将会被同步到 `viewer.entities` 中， 但 `viewer.entities` 中的新增和删除不影响 `collection`。

在下文中，我们称这种关系为 `collection` 同步到 `viewer.entities`。

```js{1}
const collection = syncEntityCollection(viewer.entities)

const entity = collection.add({})
viewer.entities.contains(entity) // true!

collection.remove(entity)
viewer.entities.contains(entity) // false!

const entityOfTarget = viewer.entities.add({})
collection.contains(entityOfTarget) // false!
```

你也可以嵌套的同步 `Cesium.EntityCollection`，在下面的例子中，`son1`和`son2` 同步到 `father`，`father` 同步到 `viewer.entities` ：

```js{3,6,8}
const father = new Cesium.EntityCollection()

const son1 = syncEntityCollection(father)

const son2 = new Cesium.EntityCollection()
syncEntityCollection(father, son2) // 也可以同步多个 EntityCollection。

syncEntityCollection(viewer.entities, father)

const e = son1.add({})
viewer.entities.contains(e) // true!
```
