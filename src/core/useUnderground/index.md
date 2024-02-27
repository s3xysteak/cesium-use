# useUnderground

Trigger the underground mode responsively.

## Usage

```js
const { state } = useUnderground()
state.value = true //Turn on
state.value = false //Turn off
```

Since `state` is a ref, you can create side effects for toggling the underground mode using `watch`.

## Type Declaration

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
