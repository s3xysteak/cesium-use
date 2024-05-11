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
  <div absolute top-4 left-4 flex="~ col">
    <input v-model="lon" type="number" input placeholder="lon">
    <input v-model="lat" type="number" input placeholder="lat">
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
