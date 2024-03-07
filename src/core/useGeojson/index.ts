import * as Cesium from 'cesium'
import { toValue, watchEffect, type MaybeRefOrGetter } from 'vue'

export interface UseGeojsonConfigItem {
  url: string
  dataSourceOptions?: Parameters<Cesium.GeoJsonDataSource['load']>[1]
}

export function useGeojson(config: MaybeRefOrGetter<UseGeojsonConfigItem[]>) {
  watchEffect(() => {
    toValue(config).forEach(async item => {
      const dataSource = await Cesium.GeoJsonDataSource.load(
        item.url,
        item.dataSourceOptions
      )
    })
  })
}
