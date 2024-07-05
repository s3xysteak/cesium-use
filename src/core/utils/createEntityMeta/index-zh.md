# createEntityMeta

为entity设置自定义属性，包括良好的类型并避免属性名冲突。

## Usage

函数内部使用symbol以保证不存在属性冲突：

```js
const [setEntityMeta, getEntityMeta] = createEntityMeta()

const e = new Entity()
setEntityMeta(e, 'hello')
getEntityMeta(e) // 返回 -> 'hello'

// 为同一个entity设置更多属性

const [s, g] = createEntityMeta()

s(e, 'world')
g(e) // 返回 -> 'world'
```

如果你不喜欢数组解构，你也可以使用对象解构：

```js
const {
  setEntityMeta,
  getEntityMeta
} = createEntityMeta()

// ...
```

传入泛型以获取更好的类型提示：

```ts
interface Options {
  foo: number
  bar: string
}

const [s, g] = createEntityMeta<Options>()

const e = new Entity()

s(e, {
  foo: 1,
  bar: '2'
}) // 类型提示

g(e) // { foo: 1, bar: '2'}
```

使用JavaScript时，你可以传入一个用于类型推断的参数：

```js
const [s, g] = createEntityMeta({
  foo: 1,
  bar: '2'
}) // 这里的参数仅用于类型推断

// ... 和上个示例相同
```
