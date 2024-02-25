# useUnderground

响应式的触发地下模式。

## 使用

```js
const { state } = useUnderground()
state.value = true //开启地下模式
state.value = false //关闭地下模式
```

因为 state 是一个 ref，因此你可以通过 watch 来为地下模式的开关制造副作用。

## 类型声明

:::details

```ts
export interface UseUndergroundOptions {
  frontFaceAlphaByDistance: ConstructorParameters<typeof Cesium.NearFarScalar>
}

export function useUnderground(
  initialState = false,
  options?: MaybeRefOrGetter<Partial<UseUndergroundOptions>>
): { state: Ref<boolean> }
```

:::
