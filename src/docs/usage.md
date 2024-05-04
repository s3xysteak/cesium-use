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
import CesiumUseResolver from 'cesium-use/resolver'

export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [
        CesiumUseResolver()
      ]
    })
  ]
})
```

The `CesiumUseResolver` function accepts an optional object as a parameter, representing the `name -> alias` mapping.
For example:

```js
CesiumUseResolver({
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

::: warning
Currently, automatic import supports functions only and does not support automatic import for components.
:::
