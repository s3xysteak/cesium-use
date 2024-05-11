import type { Plugin } from 'vite'

function supportCesium(): Plugin {
  return {
    name: 'support-cesium',
    enforce: 'pre',
    transformIndexHtml: () => [
      {
        tag: 'script',
        attrs: {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/cesium/1.117.0/Cesium.min.js',
        },
      },
      {
        tag: 'script',
        children: `Object.defineProperties(window, { CESIUM_BASE_URL: { value: 'https://cdnjs.cloudflare.com/ajax/libs/cesium/1.117.0/' } })`,
      },
    ],
  }
}

export default supportCesium
