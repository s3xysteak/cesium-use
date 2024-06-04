# syncEntityCollection

Sync two `Cesium.EntityCollection` , to synchronize the source collection to the target collection **in one direction**.

## Usage

In the example below, additions and deletions to `collection` will be synchronized with `viewer.entities`, but additions and deletions in `viewer.entities` do not affect `collection`.

In the following text, we refer to this relationship as `collection` syncing to `viewer.entities`.

```js{1}
const collection = syncEntityCollection(viewer.entities)

const entity = collection.add({})
viewer.entities.contains(entity) // true!

collection.remove(entity)
viewer.entities.contains(entity) // false!

const entityOfTarget = viewer.entities.add({})
collection.contains(entityOfTarget) // false!
```

You can also nest sync `Cesium.EntityCollection`. In the example below, `son1` and `son2` sync to `father`, and `father` syncs to `viewer.entities`:

```js{3,6,8}
const father = new Cesium.EntityCollection()

const son1 = syncEntityCollection(father)

const son2 = new Cesium.EntityCollection()
syncEntityCollection(father, son2) // or multiples EntityCollections.

syncEntityCollection(viewer.entities, father)

const e = son1.add({})
viewer.entities.contains(e) // true!
```
