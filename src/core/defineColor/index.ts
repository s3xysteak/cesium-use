import * as Cesium from 'cesium'

export const defineColor = (str: string): Cesium.Color => {
  if (str.startsWith('rgb') || str.startsWith('hsl')) {
    return Cesium.Color.fromCssColorString(str)
  }

  const [color, op] = str.split('/')

  return op
    ? Cesium.Color.fromCssColorString(color).withAlpha(Number(op) / 100)
    : Cesium.Color.fromCssColorString(color)
}
