import { tryOnScopeDispose } from '@vueuse/core'
import { linkEntityCollection, useViewer } from '~/index'

export function useEntityCollection(viewer = useViewer()) {
  const collection = linkEntityCollection(viewer.entities)

  tryOnScopeDispose(() => {
    collection.removeAll()
  })

  return collection
}
