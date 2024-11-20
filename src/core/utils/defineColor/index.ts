import * as Cesium from 'cesium'

/**
 * Define a `Cesium.Color` from a string.
 *
 * ## example
 * ```js
 * defineColor('#00ff00/60') // #00ff00 with 60% alpha
 * defineColor('green/60')
 * defineColor('green')
 * defineColor('rgb(0 255 0)')
 * ```
 */
export function defineColor(str: string): Cesium.Color {
  if (str.startsWith('rgb') || str.startsWith('hsl'))
    return Cesium.Color.fromCssColorString(str)

  const [color, op] = str.split('/')

  return op
    ? Cesium.Color.fromCssColorString(color).withAlpha(Number(op) / 100)
    : Cesium.Color.fromCssColorString(color)
}

if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  describe('color', () => {
    it('should work', () => {
      expect(defineColor('#ffffff')).toEqual(Cesium.Color.fromCssColorString('#ffffff'))

      expect(defineColor('#fff')).toEqual(Cesium.Color.fromCssColorString('#ffffff'))

      expect(defineColor('#fff/10')).toEqual(
        Cesium.Color.fromCssColorString('#ffffff').withAlpha(0.1),
      )

      expect(defineColor('#ffffff/20')).toEqual(
        Cesium.Color.fromCssColorString('#ffffff').withAlpha(0.2),
      )
    })
  })
}
