# useTimeline

Reactive timeline. Used To control currentTime, start/endTime, time rate...

## Usage

```js
const { currentTime } = useTimeline()
```

More usage please refer to the Demo and the type declaration.

Please note that `paused` is a read-only property. If you want to pause/resume time, please call the `play()` or `pause()` methods.
