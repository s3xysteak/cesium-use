<script setup lang="ts">
import { computed, defineComponent, h, ref } from 'vue'
import Located from './Located.vue'

const show = ref(true)
const lon = ref<number | ''>(-100)
const lat = ref<number | ''>(40)

const coordinate = computed(() => [lon.value === '' ? -100 : lon.value, lat.value === '' ? 40 : lat.value])

const MyButton = defineComponent((_, { slots }) => {
  return () => h('button', { class: 'btn' }, slots.default?.())
})
</script>

<template>
  <div panel-absolute w-25 flex="~ col gap-y-2">
    <label>
      longitude:
      <input v-model="lon" w-20 type="number" input placeholder="lon">
    </label>
    <label>
      latitude:
      <input v-model="lat" w-20 type="number" input placeholder="lat">
    </label>
  </div>

  <div id="teleport-container" />

  <Located
    v-model="show"
    :as="MyButton"
    placement="top"
    :coordinate="coordinate"
    teleport-to="#teleport-container"
  >
    <div>
      Hello world!
    </div>
  </Located>
</template>
