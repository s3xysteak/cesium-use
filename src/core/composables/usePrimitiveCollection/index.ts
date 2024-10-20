import { tryOnScopeDispose } from '@vueuse/core'
import * as Cesium from 'cesium'
import { useViewer } from '../useViewer'

/**
 * Create a PrimitiveCollection, which synchronizes with the `viewer.scene.primitives`.
 * It will be cleared when the component is unmounted.
 *
 * @returns Will be cleared when the scope disposed
 */
export function usePrimitiveCollection(source = useViewer().scene.primitives) {
  const primitives = new Cesium.PrimitiveCollection()

  source.add(primitives)
  tryOnScopeDispose(() => {
    primitives.removeAll()
    source.remove(primitives)
  })

  return primitives
}
