# moveByKeyboard

使用`W S A D`进行前后左右移动，使用`shift`向下移动，使用`space`向上移动。

## 使用

```js
const speed = ref(1)
moveByKeyboard({
  distancePerFrame: speed,
  keybinding: {
    forward: 'ArrowUp',
    backward: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
  }
})
```

`distancePerFrame`接受响应式的数字类型参数，以动态调整移动速度。当你希望禁用移动时，可以直接将其设置`{ distancePerFrame: 0 }`。  
可以通过`keybinding`选项修改按键绑定。

## 类型声明

::: details

```ts
export type MoveByKeyboardKeybindingList =
  | 'forward'
  | 'backward'
  | 'left'
  | 'right'
  | 'down'
  | 'up'
export interface MoveByKeyboardOptions {
  distancePerFrame?: MaybeRefOrGetter<number>
  keybinding?: Partial<Record<MoveByKeyboardKeybindingList, string>>
}

export function moveByKeyboard(options: MoveByKeyboardOptions = {}): void
```

:::
