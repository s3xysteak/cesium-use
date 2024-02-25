<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, type Component } from 'vue'
import { useElementBounding } from '@vueuse/core'
import * as Cesium from 'cesium'

type Rect = {
  width: number
  height: number
}

type Placement =
  | 'topLeft'
  | 'top'
  | 'topRight'
  | 'right'
  | 'bottomRight'
  | 'bottom'
  | 'bottomLeft'
  | 'left'

const placementMap: Record<Placement, (rect: Rect) => Rect> = {
  topLeft: rect => ({
    width: -rect.width,
    height: -rect.height
  }),
  top: rect => ({ width: -rect.width / 2, height: -rect.height }),
  topRight: rect => ({ width: 0, height: -rect.height }),
  right: rect => ({ width: 0, height: -rect.height / 2 }),
  bottomRight: _rect => ({ width: 0, height: 0 }),
  bottom: rect => ({ width: -rect.width / 2, height: 0 }),
  bottomLeft: rect => ({ width: -rect.width, height: 0 }),
  left: rect => ({ width: -rect.width, height: -rect.height / 2 })
}

type LonLatAlt =
  | number[]
  | {
      lon: number
      lat: number
      alt?: number
    }
  | Cesium.Cartesian3

interface Props {
  coordinate: LonLatAlt

  /**
   * 元素方位
   * @default 'bottomRight'
   */
  placement?: Placement

  /**
   * 偏差
   */
  offset?: Partial<{
    left: number
    top: number
  }>

  as?: string | Component
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'bottomRight',
  as: 'div'
})

const state = defineModel<boolean>({
  required: true
})
/**
 * 样式的原始形式，不能直接使用，单位`px`。
 */
const styleRaw = ref<{ left: number; top: number } | ''>('')

const { placement } = props

const viewer = getViewer()

const el = ref()

const isShow = ref(true)

const { width, height } = useElementBounding(el)

const update = () => {
  if (!state.value) return

  const coordinate = props.coordinate
  if (!coordinate) return

  const position =
    coordinate instanceof Cesium.Cartesian3
      ? viewer.scene.cartesianToCanvasCoordinates(coordinate)
      : Array.isArray(coordinate)
      ? viewer.scene.cartesianToCanvasCoordinates(
          Cesium.Cartesian3.fromDegrees(
            coordinate[0],
            coordinate[1],
            coordinate[2]
          )
        )
      : viewer.scene.cartesianToCanvasCoordinates(
          Cesium.Cartesian3.fromDegrees(
            coordinate.lon,
            coordinate.lat,
            coordinate.alt
          )
        )

  // position在奇怪的时候会是undefined，并不知道为什么
  if (!position) {
    isShow.value = false
    return
  }
  isShow.value = true

  const offsetPlacement = placementMap[placement]({
    width: width.value,
    height: height.value
  })

  styleRaw.value = {
    left:
      position.x + (offsetPlacement?.width ?? 0) + (props.offset?.left ?? 0),
    top: position.y + (offsetPlacement?.height ?? 0) + (props.offset?.top ?? 0)
  }
}

onMounted(() => {
  viewer.scene.postRender.addEventListener(update)
})
onUnmounted(() => {
  viewer.scene.postRender.removeEventListener(update)
})

const styleUsed = computed(() =>
  styleRaw.value
    ? {
        left: styleRaw.value.left + 'px',
        top: styleRaw.value.top + 'px'
      }
    : ''
)
</script>

<template>
  <Teleport to="body">
    <component
      :is="as"
      :style="[
        styleUsed,
        {
          position: 'fixed',
          visibility: state && isShow ? 'visible' : 'hidden'
        }
      ]"
      ref="el"
    >
      <slot />
    </component>
  </Teleport>
</template>
