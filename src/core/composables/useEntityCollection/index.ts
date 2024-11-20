import { tryOnScopeDispose } from '@vueuse/core'
import { syncEntityCollection } from '~/core/utils/syncEntityCollection'
import { useViewer } from '../useViewer'

/**
 * Create a EntityCollection, which synchronizes with the `viewer.entities`.
 * It will be cleared when the component is unmounted.
 *
 * ## example
 * ```js
 * const viewer = useViewer()
 *
 * const entities = useEntityCollection()
 * const e = entities.add({})
 *
 * viewer.entities.contains(e) // true!
 * ```
 */
export function useEntityCollection(entities = useViewer().entities) {
  const e = syncEntityCollection(entities)
  tryOnScopeDispose(() => e.removeAll())

  return e
}
