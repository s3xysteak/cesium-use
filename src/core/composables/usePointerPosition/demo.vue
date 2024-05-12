<script setup lang="ts">
import { computed, ref } from 'vue'
import { usePointerPosition } from '@/index'

const input = ref('')
const throttle = computed(() =>
  Number.isNaN(Number(input.value)) ? 0 : Number(input.value),
)
const [lon, lat, alt] = usePointerPosition({
  throttle,
})
</script>

<template>
  <div panel>
    <input v-model="input" input placeholder="throttle interval .. ms...">

    <div mt-2 rounded p-2 b-t="1 solid dark" dark:b-t-light>
      <div>lon : {{ lon }}</div>
      <div>lat : {{ lat }}</div>
      <div>height : {{ alt }}</div>
    </div>
  </div>
</template>
