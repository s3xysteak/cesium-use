# usePointerPosition

Obtain the current mouse's latitude, longitude, and altitude reactively.
Implement optional throttling based on `vueuse`'s `useThrottleFn`.

## Usage

```vue
<script setup>
const { alt, lat, lon } = usePointerPosition({
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

## Type Declaration

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
