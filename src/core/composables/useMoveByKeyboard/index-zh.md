# useMoveByKeyboard

平行于地面移动。

使用`W S A D`进行前后左右移动，使用`shift`向下移动，使用`space`向上移动。

## 使用

```js
const speed = ref(1)
useMoveByKeyboard({
  // distancePerFrame: 1,
  distancePerFrame: speed,
  keybinding: {
    forward: 'ArrowUp',
    backward: 'ArrowDown',
    left: 'ArrowLeft',
    right: 'ArrowRight'
  }
})
```

`distancePerFrame` 接受响应式的数字类型参数，以动态调整移动速度。当你希望禁用移动时，可以直接将其设置`{ distancePerFrame: 0 }`。
可以通过`keybinding`选项修改按键绑定。

`distancePerFrame` 还可以接受一个函数以更加细粒度的控制速度:

```js
useMoveByKeyboard({
  distancePerFrame(key) {
    if (key === 'backward')
      return 1

    return 3
  }
})
```

### 可选的按键

按键绑定基于`vueuse`的`useMagicKeys`实现，更多可选的按键见[mozilla](https://developer.mozilla.org/zh-CN/docs/Web/API/KeyboardEvent/key)
