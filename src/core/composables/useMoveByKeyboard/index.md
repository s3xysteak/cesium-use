# useMoveByKeyboard

Moving parallel to the ground.

To move forward, backward, left, and right, use `W S A D`. Press `Shift` to move downward and `Space` to move upward.

## 使用

```js
const speed = ref(1)
useMoveByKeyboard({
  distancePerFrame: speed,
  keybinding: {
    forward: 'ArrowUp',
    backward: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
  }
})
```

The `distancePerFrame` accepts a reactive numeric parameter to dynamically adjust the movement speed.When you wish to disable movement, you can simply set it to `{ distancePerFrame: 0 }`.
You can modify key bindings through the keybinding option.

### Optional Keys

Key bindings are based on `useMagicKeys` implementation from `vueuse`. For more optional keys, see [mozilla](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key).
