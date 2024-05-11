<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMoveByKeyboard } from '.'

const input = ref<string>('10')
const speed = computed(() =>
  Number.isNaN(Number(input.value)) ? 4 : Number(input.value),
)
useMoveByKeyboard({
  distancePerFrame: speed,
})
</script>

<template>
  <div bg-blue-1 p-2 rounded absolute top-4 left-4>
    speed: <input v-model="input" input>
  </div>

  <div bg-light rounded absolute top-4 right-4 p-2 text-sm>
    tips:

    Use WSAD keys to move the camera!
  </div>
</template>
