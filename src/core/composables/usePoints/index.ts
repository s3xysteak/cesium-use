import * as Cesium from 'cesium'
import type { MaybeRefOrGetter } from 'vue'
import { toValue, watchEffect } from 'vue'
import { error } from '@/shared/errorHandler'
import { getViewer } from '~composables/viewerStore'

// TODO: Type improvement
export type UsePointsBillboardOptions = Omit<Cesium.Billboard.ConstructorOptions, 'position'>

// TODO: Typo improvement
export type UsePointsLabelOptions = Omit<Cesium.Label.ConstructorOptions, 'position'>
export interface UsePointsOptions {
  id: any
  longitude: number | string
  latitude: number | string
  height?: number | string
  billboardOptions: UsePointsBillboardOptions
  labelOptions: UsePointsLabelOptions
  onEach?: (
    item: { label: Cesium.Label, billboard: Cesium.Billboard },
    index: number
  ) => void
}

export function usePoints<UsePointsItem extends object = object>(
  data: MaybeRefOrGetter<UsePointsItem[]>,
  options: (item: UsePointsItem) => UsePointsOptions,
) {
  const viewer = getViewer()

  const points: Map<
    string,
    { label: Cesium.Label, billboard: Cesium.Billboard }
  > = new Map()

  const labelCollection = new Cesium.LabelCollection({ scene: viewer.scene })
  viewer.scene.primitives.add(labelCollection)
  const billboardCollection = new Cesium.BillboardCollection({
    scene: viewer.scene,
  })
  viewer.scene.primitives.add(billboardCollection)

  const defaultBillboardOptions: UsePointsOptions['billboardOptions'] = {
    heightReference: Cesium.HeightReference.RELATIVE_TO_TERRAIN,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  }
  const defaultLabelOptions: UsePointsOptions['labelOptions'] = {
    heightReference: Cesium.HeightReference.RELATIVE_TO_TERRAIN,
    disableDepthTestDistance: Number.POSITIVE_INFINITY,
  }

  watchEffect(() => {
    points.clear()
    billboardCollection.removeAll()
    labelCollection.removeAll()

    toValue(data).forEach((item, index) => {
      const {
        id,
        longitude: lon,
        latitude: lat,
        height: alt,
        billboardOptions,
        labelOptions,
        onEach,
      } = options?.(item)

      const pos: [number, number, number | undefined] = [
        Number(lon),
        Number(lat),
        alt === undefined ? undefined : Number(alt),
      ]

      const billboard = billboardCollection.add(
        Object.assign(
          defaultBillboardOptions,
          {
            position: Cesium.Cartesian3.fromDegrees(...pos),
          },
          billboardOptions,
        ),
      )
      const label = labelCollection.add(
        Object.assign(
          defaultLabelOptions,
          {
            position: Cesium.Cartesian3.fromDegrees(...pos),
          },
          labelOptions,
        ),
      )
      onEach && onEach({ label, billboard }, index)

      points.set(id, { label, billboard })
    })
  })

  const toggleShow = (state?: boolean) => {
    billboardCollection.show
      = state === undefined ? !billboardCollection.show : state
    labelCollection.show = state === undefined ? !labelCollection.show : state
  }

  const flyTo = async (
    id: UsePointsOptions['id'],
    fn?: (billboard: Cesium.Billboard, coordinate: Cesium.Cartesian3) => void,
  ) => {
    const point = points.get(id)
    if (point === undefined)
      error('cannot find point with the id.')

    const { billboard } = point
    const coordinate = (
      billboard as Cesium.Billboard & {
        _actualClampedPosition: Cesium.Cartesian3
      }
    )._actualClampedPosition

    fn && fn(billboard, coordinate)

    const fly = async (pos: typeof coordinate) => {
      const entity = viewer.entities.add({
        position: pos,
        label: {
          text: 'here!',
          fillColor: Cesium.Color.TRANSPARENT,
        },
      })

      await viewer.flyTo(entity)
      viewer.entities.remove(entity)
    }
    await fly(coordinate)

    return billboard
  }

  return {
    billboardCollection,
    labelCollection,
    points,
    toggleShow,
    flyTo,
  }
}
