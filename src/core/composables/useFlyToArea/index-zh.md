# useFlyToArea

基于`flyToBoundingSphere`将视角移动到刚好能看到所有输入坐标的位置。

## 使用

```js
const flyToArea = useFlyToArea()
flyToArea([[100, 20], [120, 40], [110, 30]], {
  onSingle: () => flyTo(id),
  onEmpty: () => initCamera()
})
```

默认情况下：

- 数组中无数据时，不进行任何操作
- 数组中只有 1 个数据时，视角会飞行到俯视角位置。

## 类型声明

::: details

```ts
export interface UseFlyToAreaOptions {
  onSingle: () => void
  onEmpty: () => void
}

function useFlyToArea(
  posList: MaybeCartesian3OrLonLat[],
  options?: Partial<UseFlyToAreaOptions>
): void
```

:::
