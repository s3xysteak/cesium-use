# createEntityMeta

Set customized properties for entity, with types and no conflict.

## Usage

It use symbol internally to ensure there is no conflict:

```js
const [setEntityMeta, getEntityMeta] = createEntityMeta()

const e = new Entity()
setEntityMeta(e, 'hello')
getEntityMeta(e) // returns -> 'hello'

// Even set more property for one entity

const [s, g] = createEntityMeta()

s(e, 'world')
g(e) // returns -> 'world'
```

If you do not like array destructure, you can also use object destructure:

```js
const {
  setEntityMeta,
  getEntityMeta
} = createEntityMeta()

// ...
```

Use generics to have the better type intellisense:

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
}) // intellisense

g(e) // { foo: 1, bar: '2'}
```

With Javascript, you can passing a parameter for type inference:

```js
const [s, g] = createEntityMeta({
  foo: 1,
  bar: '2'
}) // The parameter here is only used for type inference.

// ... same as above
```
