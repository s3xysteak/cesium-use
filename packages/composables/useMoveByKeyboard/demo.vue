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
  <div panel>
    <div p-2 rounded>
      speed: <input v-model="input" input>
    </div>

    <div mt-2 b-t="1 solid dark" dark:b-t-light p-2 text-sm>
      tips:

      Use WSAD keys to move the camera!
    </div>
  </div>
</template>
