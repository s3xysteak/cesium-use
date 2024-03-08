# useUnderground

响应式的触发地下模式。

## 使用

```js
const { state } = useUnderground()
state.value = true //开启地下模式
state.value = false //关闭地下模式
```

因为 state 是一个 ref，因此你可以通过 watch 来为地下模式的开关制造副作用。  
在`useUnderground`内部，通过`state.value ? underOn() : underOff()`来开关地下模式，你可以在外部创造 state 的副作用，以实现在开关地下模式时的额外行为。

```js
const { state } = useUnderground()
watchEffect(() => {
  state.value ? doWhenOn() : doWhenOff()
})
```

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
