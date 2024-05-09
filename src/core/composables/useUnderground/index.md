# useUnderground

Trigger the underground mode responsively.

## Usage

```js
const { state } = useUnderground()
state.value = true // Turn on
state.value = false // Turn off
```

Since `state` is a ref, you can create side effects for toggling the underground mode using `watch`.
Inside `useUnderground`, the underground mode is toggled using `state.value ? underOn() : underOff()`. You can create side effects on the state externally to achieve additional behavior when toggling the underground mode.

```js
const { state } = useUnderground()
watchEffect(() => {
  state.value ? doWhenOn() : doWhenOff()
})
```
