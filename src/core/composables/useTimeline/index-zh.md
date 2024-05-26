# useTimeline

响应式的时间线。可以控制当前时间，开始、结束时间，时间速率等。

## 使用

```js
const { currentTime } = useTimeline()
```

```js
const clock = new Cesium.Clock()
const { play } = useTimeline(clock)
play()
```

`useTimeline` 接受一个可选的 `Cesium.Clock` 作为参数。默认情况下，通过 `useViewer` 获取上下文中 `viewer.clock` 。

`currentTime`, `startTime`, `stopTime` 都是精确到毫秒的Unix时间戳。`rate` 用于控制时间流速，小于0时可以让时间倒流。需要注意的是，`paused` 为只读属性。如果希望让时间暂停/流动，请调用 `play()`或`pause()` 方法。

更多用法请见Demo与类型声明。
