# 安装

## 前置准备

推荐使用包管理工具安装，这里通过`pnpm`举例：

::: code-group

```sh [npm]
$ npm i cesium-use
```

```sh [pnpm]
$ pnpm i cesium-use
```

建议首先阅读 [useViewer](composables/useViewer.md) 章节以了解如何初始化`Viewer`。

:::

## 自动引入

这是一个可选步骤，因为使用自动引入会极大改善开发体验，因此强烈建议使用自动引入。
使用如下命令安装`unplugin-auto-import`:

```sh
$ pnpm i -D unplugin-auto-import
```

更多关于`unplugin-auto-import`的内容请移步[其 github 仓库](https://github.com/unplugin/unplugin-auto-import)。

使用`unplugin-auto-import`，这里以`Vite`为例：

```js
import CesiumUseImports from 'cesium-use/imports'

import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'

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

`CesiumUseImports`接受一个可选的对象作为参数，表示 `name -> alias` 的映射。
以如下配置为例：

```js
CesiumUseImports({
  defineColor: 'color'
})
```

```js
// 映射前

// unplugin-auto-import处理后的代码
import { defineColor } from 'cesium-use'
```

```js
// 映射后

// unplugin-auto-import处理后的代码
import { defineColor as color } from 'cesium-use'
```

你还可以使用 [unplugin-vue-components](https://github.com/unplugin/unplugin-vue-components) 对组件进行自动引入：

```js
import CesiumUseResolvers from 'cesium-use/resolvers'

import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

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
