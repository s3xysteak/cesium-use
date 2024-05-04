# projectionPosition

计算两个 `Cartesian3` 的投影点的 `Cartesian3` 坐标。

## 使用

```js
const projection = projectionPosition(p0, p1)
```

有给定两向量 $p_0 = (x_0, y_0, z_0)$ 和 $p_1 = (x_1, y_1, z_1)$，这个函数的推导如下：

1. $\text{projection} = k \cdot p_0$
2. $(k \cdot p_0 - p_1) \cdot p_0 = 0$
3. $k = \frac{{p_0 \cdot p_1}}{{p_0 \cdot p_0}}$

## 类型声明

::: details

```ts
function projectionPosition(p0: Cesium.Cartesian3, p1: Cesium.Cartesian3): Cesium.Cartesian3
```

:::
