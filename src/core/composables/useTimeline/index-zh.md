# useTimeline

响应式的时间线。可以控制当前时间，开始、结束时间，时间速率等。

## 使用

```js
const { currentTime } = useTimeline()
```

更多用法请见Demo与类型声明。

需要注意的是，`paused` 为只读属性。如果希望让时间暂停/流动，请调用 `play()`或`pause()` 方法。
