# useTimeline

Reactive timeline. Used To control currentTime, start/endTime, time rate...

## Usage

```js
const { currentTime } = useTimeline()
```

`currentTime`, `startTime`, `stopTime` are all Unix Time Stamp in milliseconds. `rate` is used to control the speed of time flow, and when it's less than 0, it can make time flow backwards. Please note that `paused` is a read-only property. If you want to pause/resume time, please call the `play()` or `pause()` methods.

More usage please refer to the Demo and the type declaration.
