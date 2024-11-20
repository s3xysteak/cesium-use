import type { Nullable } from '@s3xysteak/utils'
import type { MaybeCoordinates } from '~shared/coordinate'
import type { Cartesian3 } from 'cesium'
import { toRefs, useElementBounding } from '@vueuse/core'
import { computed, type MaybeRefOrGetter, type Ref, ref, toValue } from 'vue'
import { toCartesian3, useEventHandler, useViewer } from '~/index'

export type UseLocatedPlacement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'right'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'left'

export interface UseLocatedOptions {
  state: Ref<boolean>
  coordinate: MaybeRefOrGetter<Nullable<Cartesian3 | MaybeCoordinates>>

  /**
   * @default true
   */
  initialValue: boolean

  /**
   * @default 'bottomRight'
   */
  placement: MaybeRefOrGetter<Nullable<UseLocatedPlacement>>
  offset: {
    left?: MaybeRefOrGetter<Nullable<number>>
    top?: MaybeRefOrGetter<Nullable<number>>
  }
}

/**
 * Fix DOM on a Cartesian3.
 *
 * Component version please use `import { Located } from 'cesium-use'`
 *
 * ## example
 * ```vue
 * <script setup>
 * const state = ref(false)
 * const coordinate = ref(new Cesium.Cartesian3(123, 456, 789))
 *
 * const el = ref(null)
 * const { style, show } = useLocated(el, {
 *   state,
 *   coordinate,
 * })
 *
 * state.value = true
 * </script>
 *
 * <template>
 *   <div ref="el" class="absolute" :class="[show ? 'visible' : 'hidden']" :style>
 *     It's me, Cesium Use!
 *   </div>
 * </template>
 * ```
 */
export function useLocated(el: MaybeRefOrGetter<Nullable<HTMLElement>>, options: Partial<UseLocatedOptions> = {}) {
  const defaultPlacement = 'bottomRight'

  const {
    state: _state,
    coordinate: _coordinate,
    initialValue = true,
    placement,
    offset = {},
  } = options

  const state = _state ?? ref(initialValue)
  const coordinate = _coordinate
    ? computed(() => toValue(_coordinate))
    : ref<Nullable<Cartesian3 | MaybeCoordinates>>()
  const __show = ref(true)
  const position = ref({ x: 0, y: 0 })

  const { width, height } = useElementBounding(el)

  const placementMap: Record<UseLocatedPlacement, (rect: { width: number, height: number }) => { width: number, height: number }> = {
    topLeft: rect => ({
      width: -rect.width,
      height: -rect.height,
    }),
    top: rect => ({ width: -rect.width / 2, height: -rect.height }),
    topRight: rect => ({ width: 0, height: -rect.height }),
    right: rect => ({ width: 0, height: -rect.height / 2 }),
    bottomRight: _rect => ({ width: 0, height: 0 }),
    bottom: rect => ({ width: -rect.width / 2, height: 0 }),
    bottomLeft: rect => ({ width: -rect.width, height: 0 }),
    left: rect => ({ width: -rect.width, height: -rect.height / 2 }),
  }

  const viewer = useViewer()

  const onPostRender = useEventHandler(viewer.scene.postRender)
  onPostRender(() => {
    if (!state.value)
      return

    if (!coordinate.value) {
      __show.value = false
      return
    }

    const pos = viewer.scene.cartesianToCanvasCoordinates(toCartesian3(coordinate.value))

    if (!pos) {
      __show.value = false
      return
    }
    __show.value = true

    const offsetPlacement = placementMap[toValue(placement) ?? defaultPlacement]({
      width: width.value,
      height: height.value,
    })

    position.value = {
      x: pos.x + (offsetPlacement.width ?? 0) + (toValue(offset.left) ?? 0),
      y: pos.y + (offsetPlacement.height ?? 0) + (toValue(offset.top) ?? 0),
    }
  })

  return {
    ...toRefs(position),
    position,
    state,
    show: computed(() => state.value && __show.value),
    coordinate,
    style: computed(() => `left:${position.value.x}px;top:${position.value.y}px`),
  }
}
