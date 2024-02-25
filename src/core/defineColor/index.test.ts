import { Color } from 'cesium'
import { defineColor } from '@/index'

describe('color', () => {
  it('should work', () => {
    expect(defineColor('#ffffff')).toEqual(Color.fromCssColorString('#ffffff'))

    expect(defineColor('#fff')).toEqual(Color.fromCssColorString('#ffffff'))

    expect(defineColor('#fff/10')).toEqual(
      Color.fromCssColorString('#ffffff').withAlpha(0.1)
    )

    expect(defineColor('#ffffff/20')).toEqual(
      Color.fromCssColorString('#ffffff').withAlpha(0.2)
    )
  })
})
