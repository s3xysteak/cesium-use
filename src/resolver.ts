// --- Auto-Generated By Unplugin-Export-Collector ---

const __UnExportList = ["defineColor","editEntity","loadGeojson","projectionPosition","toCartesian3","toCoordinates","useEntityCollection","useEventHandler","useFlyToArea","useGlobePick","useMeasure","useMoveByKeyboard","usePointerPosition","usePoints","useUnderground","useViewer","useViewerProvider"] as const

/**
 * @returns Call in `resolvers` option of `unplugin-auto-import`.
 */
export default function autoImport(map?: Partial<{ [K in typeof __UnExportList[number]]: string }>) {
  return (name: string) => {
    if (!__UnExportList.includes(name as any))
      return

    return map && (map as any)[name]
      ? {
          name,
          as: (map as any)[name],
          from: 'cesium-use',
        }
      : {
          name,
          from: 'cesium-use',
        }
  }
}

// --- Auto-Generated By Unplugin-Export-Collector ---
