<script setup lang="ts">
import { useMeasureDistance } from '.'

const { state, clearAll } = useMeasureDistance()
</script>

<template>
  <div>
    <button bg-light absolute top-10 left-10 @click="state = !state">
      now {{ state }}
    </button>
    <button bg-light absolute top-20 left-10 @click="clearAll">
      clearAll
    </button>
  </div>
</template>
