# useMeasure

::experimental::

测量工具合集，用于GIS中的各种测量。

## 使用

### 测面

```js
const { state, clearAll } = useMeasure('area', {
  format: area => `Area: ${area.toFixed(2)} m²`
})
```

`state` 为 `true` 时开始测面，左键创建新的点，双击左键结束这次测面。内部通过 `editEntity` 合并各个点的构造参数。

通过 `format` 修改展示的文本内容。

### 测距

```js
const { state, clearAll } = useMeasure('distance', {
  lineEntityProps: {
    polyline: {
      width: 2,
      material: Cesium.Color.ORANGE,
    },
  },
})
```

`state` 为 `true` 时开始测距，左键创建新的点，双击左键结束这次测距。内部通过 `editEntity` 合并各个点的构造参数。

测量的距离是两个点之间的直线距离。

### 测高

```js
const { state, clearAll } = useMeasure('height')
```

`state` 为 `true` 时开始测高，左键选择起点，双击左键选择终点。内部通过 `editEntity` 合并各个点的构造参数。

通过计算投影坐标来获得高度。

## 返回值

- `state`: `Ref<boolean>` 用于控制是否正在测量。
- `current`: `ShallowRef<T>` 存放测量工具的当前实例，内容由测量方式决定。
- `set`: `Set<T>` 存放测量工具绘制的所有实例。
- `clearAll`: 一个函数，调用后清除所有实例。
- `stop`: 一个函数，用于中止当前测量实例。这会使测量结果停留在最后一次测量上。
