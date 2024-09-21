<script setup lang="ts">
import type { Nullable } from '@s3xysteak/utils'
import type { MaybeCoordinates } from '~shared/coordinate'
import type { Cartesian3 } from 'cesium'
import { type Component, ref } from 'vue'
import { useLocated, type UseLocatedOptions } from '~/index'

defineOptions({
  name: 'Located',
})

const props = withDefaults(defineProps<{
  coordinate: Nullable<Cartesian3 | MaybeCoordinates>

  placement?: UseLocatedOptions['placement']

  offset?: UseLocatedOptions['offset']

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
  offset: props.offset,
  placement: props.placement,
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
