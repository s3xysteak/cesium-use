import * as Cesium from 'cesium'

/**
 * Sync two `Cesium.EntityCollection`.
 *
 * To synchronize the source collection to the target collection **in one direction**.
 *
 * If no second argument is provided, a new `Cesium.EntityCollection` will be created.
 *
 * ## example
 *
 * ```js
 * const collection = syncEntityCollection(viewer.entities)
 *
 * const entity = collection.add({})
 * viewer.entities.contains(entity) // true!
 *
 * collection.remove(entity)
 * viewer.entities.contains(entity) // false!
 *
 * const entityOfTarget = viewer.entities.add({})
 * collection.contains(entityOfTarget) // false!
 * ```
 */
export function syncEntityCollection(
  target: Cesium.EntityCollection,
  source: Cesium.EntityCollection = new Cesium.EntityCollection(),
) {
  source.values.forEach(entity => target.add(entity))

  source.collectionChanged.addEventListener((_: any, added: Cesium.Entity[], removed: Cesium.Entity[]) => {
    added.forEach((entity) => {
      target.add(entity)
      entity.entityCollection = source
    })
    removed.forEach(entity => target.remove(entity))
  })

  return source
}
