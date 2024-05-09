# projectionPosition

Computes the `Cartesian3` coordinates of two `Cartesian3` projection points.

## Usage

```js
const projection = projectionPosition(p0, p1)
```

Give two vector $p_0 = (x_0, y_0, z_0)$ and $p_1 = (x_1, y_1, z_1)$, The derivation of this function is as follows:

1. $\text{projection} = k \cdot p_0$
2. $(k \cdot p_0 - p_1) \cdot p_0 = 0$
3. $k = \frac{{p_0 \cdot p_1}}{{p_0 \cdot p_0}}$
