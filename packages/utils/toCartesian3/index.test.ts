import * as Cesium from 'cesium'
import { describe, expect, it } from 'vitest'
import { toCartesian3 } from '.'

describe.concurrent('toCartesian3', () => {
  it('should work be instanceof Cartesian3', () => {
    expect(toCartesian3(0, 0, 0)).toBeInstanceOf(Cesium.Cartesian3)
  })

  it('should work basically', () => {
    expect(toCartesian3(0, 0, 0)).toEqual(Cesium.Cartesian3.fromDegrees(0, 0, 0))
    expect(toCartesian3(120, 80, 1000)).toEqual(Cesium.Cartesian3.fromDegrees(120, 80, 1000))
    expect(toCartesian3([120, 80, 1000])).toEqual(Cesium.Cartesian3.fromDegrees(120, 80, 1000))
    expect(toCartesian3(new Cesium.Cartesian3(100, 200, 300))).toEqual(new Cesium.Cartesian3(100, 200, 300))
  })

  it('should work without altitude', () => {
    expect(toCartesian3(120, 80)).toEqual(Cesium.Cartesian3.fromDegrees(120, 80))
    expect(toCartesian3([120, 80])).toEqual(Cesium.Cartesian3.fromDegrees(120, 80))
  })
})
