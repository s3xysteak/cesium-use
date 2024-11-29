# toCartesian3

Normalize a coordinate to `Cartesian3` 。

## Usage

```js
const pos1 = toCartesian3(new Cartesian3())
const pos2 = toCartesian3([100, 20])
const pos3 = toCartesian3([100, 20, 10])
const pos4 = toCartesian3(100, 20, 10)
const pos5 = toCartesian3({
  longitude: 100,
  latitude: 20
})
const pos6 = toCartesian3({
  longitude: 100,
  latitude: 20,
  height: 10
})
```
