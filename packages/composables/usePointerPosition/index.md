# usePointerPosition

Obtain the current mouse's latitude, longitude, and altitude reactively.
Implement optional throttling based on `vueuse`'s `useThrottleFn`.

## Usage

```vue
<script setup>
// const { longitude, latitude, altitude } = usePointerPosition()

// If you prefer the array destructuring syntax.
const [lon, lat, alt] = usePointerPosition({
  throttle: 150 // Throttling for 150ms.
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
