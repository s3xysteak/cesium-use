# useTimeline

Reactive timeline. Used To control currentTime, start/endTime, time rate...

## Usage

```js
const { currentTime } = useTimeline()
```

```js
const clock = new Cesium.Clock()
const { play } = useTimeline(clock)
play()
```

`useTimeline` accepts an optional `Cesium.Clock` as a parameter. By default, it catch `viewer.clock` in the context through `useViewer`.

`currentTime`, `startTime`, `stopTime` are all Unix Time Stamp in milliseconds. `rate` is used to control the speed of time flow, and when it's less than 0, it can make time flow backwards. Please note that `paused` is a read-only property. If you want to pause/resume time, please call the `play()` or `pause()` methods.

More usage please refer to the Demo and the type declaration.
