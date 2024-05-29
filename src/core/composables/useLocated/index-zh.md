# useLocated

将DOM固定在Cartesian3坐标上。

Demo 参见其[组件实现](/zh/components/Located.md)。

## 使用

```vue
<script setup>
const state = ref(false)
const coordinate = ref(new Cesium.Cartesian3(123, 456, 789))

const el = ref(null)
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
