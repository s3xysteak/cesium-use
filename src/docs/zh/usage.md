# 安装

## 前置准备

推荐使用包管理工具安装，这里通过`pnpm`举例：

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

接下来阅读 [useViewer](composables/useViewer.md) 章节以了解如何初始化`Viewer`。

:::

## 自动引入

这是一个可选步骤，因为使用自动引入会极大改善开发体验，因此强烈建议使用自动引入。
使用如下命令安装`unplugin-auto-import`:

```sh
$ pnpm add -D unplugin-auto-import
```

更多关于`unplugin-auto-import`的内容请移步[其 github 仓库](https://github.com/unplugin/unplugin-auto-import)。

使用`unplugin-auto-import`，这里以`Vite`为例：

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

`CesiumUseResolver`接受一个可选的对象作为参数，表示 `name -> alias` 的映射。
以如下配置为例：

```js
CesiumUseResolver({
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

::: warning
目前只支持对函数进行自动引入，暂不支持对组件进行自动引入。
:::
