import * as Cesium from 'cesium'
import { throwError } from '~shared/errorHandler'
import { useViewer } from '~composables/useViewer'

export function useEntityCollection(viewer = useViewer()) {
  return (...args: ConstructorParameters<typeof Cesium.EntityCollection>) => new EntityCollection(viewer, ...args)
}

class EntityCollection extends Cesium.EntityCollection {
  viewer: Cesium.Viewer

  constructor(viewer: Cesium.Viewer, ...args: ConstructorParameters<typeof Cesium.EntityCollection>) {
    super(...args)
    this.viewer = viewer
  }

  add(entity: Cesium.Entity | Cesium.Entity.ConstructorOptions) {
    const e = this.viewer.entities.add(entity)
    return super.add(e)
  }

  getOrCreateEntity(id: string) {
    const result = this.getById(id)
    if (result) {
      if (!this.viewer.entities.contains(result))
        throwError('the entity in the collection but not in the viewer.')
    }
    else {
      // result必为undefined
      if (this.viewer.entities.getById(id) !== undefined)
        throwError('the entity not in the collection but in the viewer.')
    }
    const entity = super.getOrCreateEntity(id)

    this.viewer.entities.getById(id) ?? this.viewer.entities.add(entity)
    return entity
  }

  remove(entity: Cesium.Entity) {
    return super.remove(entity)
  }

  removeAll() {
    this.values.forEach((entity) => {
      this.viewer.entities.remove(entity)
    })
    super.removeAll()
  }

  removeById(id: string) {
    const me = super.removeById(id)
    const v = this.viewer.entities.removeById(id)
    if (me !== v)
      throwError('The collection and viewer states are inconsistent.')

    return me
  }
}
