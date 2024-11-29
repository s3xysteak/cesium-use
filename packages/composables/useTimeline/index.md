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

### Returns

The return values are either functions or reactive variables:

- `rate`: A number representing the rate of time flow.
- `paused`: A read-only boolean indicating whether time is stopped.
- `currentTime`: A number representing the current time (Unix timestamp).
- `startTime`: A number representing the start time of the timeline (Unix timestamp).
- `stopTime`: A number representing the end time of the timeline (Unix timestamp).
- `play`: A function to make time start flowing.
- `pause`: A function to pause the time.
