# useLocated

Fix DOM on a Cartesian3.

Demo please refer to [component version](/components/Located.md)。

## Usage

```vue
<script setup>
const state = ref(false)
const coordinate = ref(new Cesium.Cartesian3(123, 456, 789))

const el = useTemplateRef('el')
const { style, show } = useLocated(el, {
  state,
  coordinate,
})

state.value = true
</script>

<template>
  <div ref="el" class="absolute" :class="[show ? 'visible' : 'hidden']" :style>
    It's me, Cesium Use!
  </div>
</template>
```
