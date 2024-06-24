import * as Cesium from 'cesium'

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
