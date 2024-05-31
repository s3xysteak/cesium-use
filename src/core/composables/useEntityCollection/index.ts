import { tryOnScopeDispose } from '@vueuse/core'
import { EntityCollection } from 'cesium'
import { linkEntityCollection, useViewer } from '~/index'

export function useEntityCollection(viewer = useViewer()) {
  const collection = new EntityCollection()

  const unlink = linkEntityCollection(viewer.entities, collection)

  tryOnScopeDispose(() => {
    collection.removeAll()
    unlink()
  })

  return collection
}
