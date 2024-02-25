# usePointerPosition

响应式的获取当前鼠标的经纬度与高程。
基于`vueuse`的`useThrottleFn`实现可选的节流。

## 使用

```vue
<script setup>
const { alt, lat, lon } = usePointerPosition({
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

## 类型声明

::: details

```ts
export interface UsePointerPositionOptions {
  throttle?: Parameters<typeof useThrottleFn>[1]
}

export function usePointerPosition(options: UsePointerPositionOptions = {}): {
  lon: Ref<string>
  lat: Ref<string>
  alt: Ref<string>
}
```

:::
