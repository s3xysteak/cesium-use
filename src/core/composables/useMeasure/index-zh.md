# useMeasure

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
