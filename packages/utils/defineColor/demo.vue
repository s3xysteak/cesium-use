<script setup lang="ts">
import * as Cesium from 'cesium'
import { ref, watchEffect } from 'vue'
import { defineColor, editEntity, useEntityCollection } from '~/index'

const input = ref('#00ffff/50')

const entities = useEntityCollection()
const entity = entities.add({
  polygon: {
    hierarchy: Cesium.Cartesian3.fromDegreesArray([-100, 30, -80, 70, -10, 40]),
  },
})
watchEffect(() => {
  try {
    editEntity(entity, {
      polygon: {
        material: defineColor(input.value),
      },
    })
  }
  catch {
    editEntity(entity, {
      polygon: {
        material: defineColor('#00ffff/50'),
      },
    })
  }
})
</script>

<template>
  <div panel>
    Color : <input v-model="input" placeholder="rgb(0 255 255)" input>
  </div>
</template>
