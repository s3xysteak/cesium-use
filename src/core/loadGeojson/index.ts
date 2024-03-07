import * as Cesium from 'cesium'

export interface LoadGeojsonConfig<CustomReturns = any> {
  url: Parameters<Cesium.GeoJsonDataSource['load']>[0]
  dataSourceOptions?: Parameters<Cesium.GeoJsonDataSource['load']>[1]
  onEntity?: (entity: Cesium.Entity) => void
  custom?: (dataSource: Cesium.GeoJsonDataSource) => CustomReturns
}

export async function loadGeojson(
  config: Omit<LoadGeojsonConfig, 'custom'>
): Promise<Cesium.GeoJsonDataSource>
export async function loadGeojson<CustomReturns>(
  config: Omit<LoadGeojsonConfig<CustomReturns>, 'onEntity'> &
    Required<Pick<LoadGeojsonConfig<CustomReturns>, 'custom'>>
): Promise<CustomReturns>

export async function loadGeojson<CustomReturns>(
  config: LoadGeojsonConfig<CustomReturns>
): Promise<CustomReturns | Cesium.GeoJsonDataSource> {
  const { url, dataSourceOptions, onEntity, custom } = config

  const dataSource = await Cesium.GeoJsonDataSource.load(url, dataSourceOptions)

  if (custom) return custom(dataSource)

  dataSource.entities.values.forEach(entity => {
    onEntity && onEntity(entity)
  })

  return dataSource
}
