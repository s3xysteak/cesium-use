import * as Cesium from 'cesium'
import type { MaybeRefOrGetter } from 'vue'
import { ref, toValue, watchEffect } from 'vue'
import { useViewer } from '~composables/useViewer'

export interface UseUndergroundOptions {
  frontFaceAlphaByDistance: ConstructorParameters<typeof Cesium.NearFarScalar>
}

export function useUnderground(
  initialState = false,
  options?: MaybeRefOrGetter<Partial<UseUndergroundOptions>>,
) {
  const viewer = useViewer()

  function underOn() {
    const { frontFaceAlphaByDistance = [600.0, 0, 8000, 0.9] }
      = toValue(options) ?? {}

    viewer.scene.globe.translucency.frontFaceAlphaByDistance
      = new Cesium.NearFarScalar(...frontFaceAlphaByDistance)
  }
  function underOff() {
    viewer.scene.globe.translucency.frontFaceAlphaByDistance = undefined as any
  }

  const state = ref(initialState)
  watchEffect(() => {
    const val = toValue(state)

    val ? underOn() : underOff()

    viewer.scene.globe.depthTestAgainstTerrain = !val

    viewer.scene.screenSpaceCameraController.enableCollisionDetection = !val
    viewer.scene.globe.translucency.enabled = val
  })

  return {
    state,
  }
}
