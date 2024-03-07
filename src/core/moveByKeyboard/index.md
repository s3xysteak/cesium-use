# moveByKeyboard

To move forward, backward, left, and right, use `W S A D`. Press `Shift` to move downward and `Space` to move upward.

## 使用

```js
const speed = ref(1)
moveByKeyboard({ distancePerFrame: speed })
```

The `distancePerFrame` accepts a reactive numeric parameter to dynamically adjust the movement speed.  
When you wish to disable movement, you can simply set it to `{ distancePerFrame: 0 }`.

## Usage Declaration

::: details

```ts
export interface MoveByKeyboardOptions {
  distancePerFrame?: MaybeRefOrGetter<number>
}
export function moveByKeyboard(options: MoveByKeyboardOptions = {}): void
```

:::
