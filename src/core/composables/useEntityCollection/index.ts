import { tryOnScopeDispose } from '@vueuse/core'
import { syncEntityCollection, useViewer } from '~/index'

export function useEntityCollection(viewer = useViewer()) {
  const collection = syncEntityCollection(viewer.entities)

  tryOnScopeDispose(() => {
    collection.removeAll()
  })

  return collection
}
