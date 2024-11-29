import * as Cesium from 'cesium'
import { describe, expect, it } from 'vitest'
import { toCoordinates } from '.'

describe.concurrent('toCoordinates', () => {
  it('should work basically', () => {
    expect(toCoordinates([120, 80, 1000])).toEqual({
      longitude: 120,
      latitude: 80,
      height: 1000,
    })
    expect(toCoordinates([120, 80])).toEqual({
      longitude: 120,
      latitude: 80,
    })
    expect(
      Object.entries(toCoordinates(Cesium.Cartesian3.fromDegrees(120, 80, 1000)))
        .map(([_, v]) => v!.toFixed(0))
        .map(Number),
    ).toEqual([120, 80, 1000])
  })
})
