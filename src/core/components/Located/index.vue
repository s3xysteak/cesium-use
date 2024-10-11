<script setup lang="ts">
import type { Nullable } from '@s3xysteak/utils'
import type { MaybeCoordinates } from '~shared/coordinate'
import type { Cartesian3 } from 'cesium'
import { type Component, ref } from 'vue'
import { useLocated, type UseLocatedPlacement } from '~/index'

defineOptions({
  name: 'Located',
})

const props = withDefaults(defineProps<{
  coordinate: Nullable<Cartesian3 | MaybeCoordinates>

  placement?: Nullable<UseLocatedPlacement>

  offset?: {
    left?: Nullable<number>
    top?: Nullable<number>
  }

  as?: string | Component
}>(), {
  as: 'div',
})
const state = defineModel<boolean>({
  default: true,
})

const el = ref()
const { style, show } = useLocated(el, {
  state,
  coordinate: () => props.coordinate,
  offset: {
    left: () => props.offset?.left,
    top: () => props.offset?.top,
  },
  placement: () => props.placement,
})
</script>

<template>
  <component
    :is="as"
    ref="el"
    :style="[
      style,
      {
        position: 'absolute',
        visibility: show ? 'visible' : 'hidden',
      },
    ]"
  >
    <slot />
  </component>
</template>
