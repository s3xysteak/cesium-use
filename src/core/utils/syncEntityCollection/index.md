# syncEntityCollection

> Keep on keeping on!

Link two `Cesium.EntityCollection` , to synchronize the source collection to the target collection in one direction.

## Usage

```js
const collection = syncEntityCollection(viewer.entities)

const entity = collection.add({})
viewer.entities.contains(entity) // true!

collection.remove(entity)
viewer.entities.contains(entity) // false!

const entityOfTarget = viewer.entities.add({})
collection.contains(entityOfTarget) // false!
```

You can also embed links `Cesium.EntityCollection` ：

```js
const father = new Cesium.EntityCollection()

const son1 = syncEntityCollection(father)

const son2 = new Cesium.EntityCollection()
syncEntityCollection(father, son2) // or multiples EntityCollections.

syncEntityCollection(viewer.entities, father)

const e = son1.add({})
viewer.entities.contains(e) // true!
```
