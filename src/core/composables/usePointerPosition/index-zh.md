# usePointerPosition

响应式的获取当前鼠标的经纬度与高程。
基于 `vueuse` 的 `useThrottleFn` 实现可选的节流。

## 使用

```vue
<script setup>
// const { longitude, latitude, altitude } = usePointerPosition()

// 如果你更喜欢解构数组的形式
const [lon, lat, alt] = usePointerPosition({
  throttle: 150 // 150ms的节流
})
</script>

<template>
  <div>
    <div>lon : {{ lon }}</div>
    <div>lat : {{ lat }}</div>
    <div>height : {{ alt }}</div>
  </div>
</template>
```
