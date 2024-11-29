# usePoints

::experimental::

打点并且响应式的更新数据。

- 第一个参数为一个数组，`usePoints`遍历这个数组以进行打点。
- 第二个参数为循环时调用的回调函数，参数为数组中的每一项。通过这个回调函数来自定义打点的标记。

这是基于 LabelCollection 和 BillboardCollection 实现的，因此其性能应当是可靠的。

## 使用

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
    // 在生成每个点位后执行的回调函数

    console.log(label)
    console.log(billboard)
  }
}))

flyTo(1) // 基于`viewer.flyTo`将镜头移动至id为1的点位
flyTo(2, (_, pos) => {
  console.log('开始flyTo时执行的回调', pos)
}).then(() => {
  console.log('flyTo完成时执行的回调')
})

toggleShow(false) // 隐藏所有点位
toggleShow() // 反转所有点位的显隐状态

const { label, billboard } = points.get(1) // 获取id为1的点位

data.value = [{ id: 1, lon: '86', lat: '27' }] // 这会触发更新，原来的点位会被清除
data.value = [] // 相当于清除所有定位
```

函数返回的`points` 是一个 Map 类型的数据，存放了 `id -> { label, billboard }` 的键值对，你可以通过对 Map 的操作来获取对应点位的数据。

::: warning 手动修改 points 的注意事项
在使用`points`进行增删改时候，不要忘记手动同步到`billboardCollection`和`labelCollection`。
因为`usePoints`被认为是用于根据一段数据生成点位的函数，因此手动修改其中的点位被认为是少见的边缘情况，目前没有计划为了方便手动修改而添加新的 API。
:::
