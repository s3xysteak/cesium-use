import * as Cesium from 'cesium'

export function linkEntityCollection(
  target: Cesium.EntityCollection,
  source: Cesium.EntityCollection = new Cesium.EntityCollection(),
) {
  source.values.forEach((entity) => {
    if (source.values.length === 0)
      return

    target.add(entity)
  })

  source.collectionChanged.addEventListener((_: any, added: Cesium.Entity[], removed: Cesium.Entity[]) => {
    added.forEach((entity) => {
      target.add(entity)
    })

    removed.forEach((entity) => {
      target.remove(entity)
    })
  })

  return source
}
