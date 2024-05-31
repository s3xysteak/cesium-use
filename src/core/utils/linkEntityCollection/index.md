# linkEntityCollection

> Keep on keeping on!

Link two `Cesium.EntityCollection` , to synchronize the source collection to the target collection in one direction.

## Usage

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

You can also embed links `Cesium.EntityCollection` ：

```js
const father = new Cesium.EntityCollection()

const son1 = new Cesium.EntityCollection()
const son2 = new Cesium.EntityCollection()

linkEntityCollection(father, son1)
linkEntityCollection(father, son2) // or multiples EntityCollections.

linkEntityCollection(viewer.entities, father)

const e = son1.add({})
viewer.entities.contains(e) // true!
```

or call the returns to unlink:

```js
const collection = new Cesium.EntityCollection()

const unlink = linkEntityCollection(viewer.entities, collection)

const e = collection.add({})
viewer.entities.contains(e) // true!

unlink()

collection.remove(e)
viewer.entities.contains(e) // still true!
```
