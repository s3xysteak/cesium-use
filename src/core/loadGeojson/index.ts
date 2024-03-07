import * as Cesium from 'cesium'

export interface LoadGeojsonConfig<CustomReturns = any> {
  url: Parameters<Cesium.GeoJsonDataSource['load']>[0]
  dataSourceOptions?: Parameters<Cesium.GeoJsonDataSource['load']>[1]
  onEntity?: (entity: Cesium.Entity) => void
  custom?: (dataSource: Cesium.GeoJsonDataSource) => CustomReturns
}

export async function loadGeojson<T extends LoadGeojsonConfig>(
  config: T
): Promise<
  T['custom'] extends (...args: any[]) => infer R ? R : Cesium.GeoJsonDataSource
> {
  const { url, dataSourceOptions, onEntity, custom } = config

  const dataSource = await Cesium.GeoJsonDataSource.load(url, dataSourceOptions)

  if (custom) return custom.bind(config)(dataSource)

  dataSource.entities.values.forEach(entity => {
    onEntity && onEntity.bind(config)(entity)
  })

  // TODO: improve type
  return dataSource as any
}
