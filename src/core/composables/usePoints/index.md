# usePoints

Plot points and update data reactively.

- The first parameter is an array that `usePoints` iterates through to plot points.
- The second parameter is a callback function called during each iteration, with each array item as an argument. Use this callback function to customize the markers for the plotted points.

This implementation is based on LabelCollection and BillboardCollection, ensuring reliable performance.

## Usage

```js
const data = shallowRef([
  { id: 1, lon: '86', lat: '27' },
  { id: 2, lon: '86.5', lat: 27.5 },
  { id: 3, lon: 87, lat: 28 },
  { id: 4, lon: '86', lat: '27', height: '500' }
])

const { points, flyTo, toggleShow } = usePoints(data, item => ({
  id: item.id,
  longitude: item.lon,
  latitude: item.lat,
  height: item.height,
  billboardOptions: {
    scale: 0.02,
    image: img
  },
  labelOptions: { text: String(item.id) },
  onEach({ label, billboard }, index) {
    // Callback function to be executed after generating each data point.

    console.log(label)
    console.log(billboard)
  }
}))

flyTo(1) // Move the camera to the point with ID 1 using `viewer.flyTo`.
flyTo(2, (_, pos) => {
  console.log('开始flyTo时执行的回调', pos)
}).then(() => {
  console.log('flyTo完成时执行的回调')
})

toggleShow(false) // HIde all points
toggleShow() // Toggle the visibility state of all data points.

const { label, billboard } = points.get(1) // Get the point with ID 1

data.value = [{ id: 1, lon: '86', lat: '27' }] // This will trigger an update, clearing the previous data points.
data.value = [] // Equal to clear all points
```

函数返回的`points` 是一个 Map 类型的数据，存放了 `id -> { label, billboard }` 的键值对，你可以通过对 Map 的操作来获取对应点位的数据。

::: warning Tips for manually modifying points
When adding, removing, or updating points using `points`, remember to manually synchronize with `billboardCollection` and `labelCollection`.
Since `usePoints` is intended to be a function for generating data points based on a dataset, manually modifying the points within it is considered a rare edge case. There are currently no plans to introduce new APIs for easier manual modifications.
:::
