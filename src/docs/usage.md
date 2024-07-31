# Installation

## Prerequisite Setup

It is recommended to install using a package management tool. Here is an example using `pnpm`:

::: code-group

```sh [npm]
$ npm add cesium-use
```

```sh [pnpm]
$ pnpm add cesium-use
```

```sh [yarn]
$ yarn add cesium-use
```

Recommend reading [useViewer](composables/useViewer.md) chapter first to learn how to initialize `Viewer`.

:::

## Automatic Import

This is an optional step, but using automatic import significantly enhances the development experience. Therefore, it is strongly recommended to use automatic import.
To install `unplugin-auto-import`, use the following command:

```sh
$ pnpm add -D unplugin-auto-import
```

For more information about `unplugin-auto-import`, please visit [its GitHub repository](https://github.com/unplugin/unplugin-auto-import).

Using `unplugin-auto-import`, here is an example with `Vite`:

```js
import { defineConfig } from 'vite'

import AutoImport from 'unplugin-auto-import/vite'
import CesiumUseImports from 'cesium-use/imports'

export default defineConfig({
  plugins: [
    AutoImport({
      imports: [
        CesiumUseImports()
      ]
    })
  ]
})
```

The `CesiumUseImports` function accepts an optional object as a parameter, representing the `name -> alias` mapping.
For example:

```js
CesiumUseImports({
  defineColor: 'color'
})
```

```js
// Before mapping

// Code after unplugin-auto-import processing
import { defineColor } from 'cesium-use'
```

```js
// After mapping

// Code after unplugin-auto-import processing
import { defineColor as color } from 'cesium-use'
```

You can also use [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) to auto-import components:

```js
import { defineConfig } from 'vite'

import Components from 'unplugin-vue-components/vite'
import CesiumUseResolvers from 'cesium-use/resolvers'

export default defineConfig({
  plugins: [
    Components({
      resolvers: [
        CesiumUseResolvers()
      ]
    })
  ]
})
```
