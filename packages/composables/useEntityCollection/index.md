# useEntityCollection

Based on [syncEntityCollection](/utils/syncEntityCollection.md), this will return a newly created `EntityCollection` that is synchronized with `viewer.entities` and will automatically be cleared when leaving the context.

Due to its wide range of use cases, this simple wrapper was created.

## Usage

Basic usage:

```ts
const entities = useEntityCollection()
// synchronizes with `viewer.entities`
entities.add({
  position: toCartesian3(113, 22, 1000),
  point: {
    pixelSize: 1000,
  },
})
// It will be cleared automatically when the component is unmounted
```

You can pass a `entities` manually as the target synchronized with:

```ts
const viewer = useViewer()
const scope = effectScope() // Provide a scope so that it can uninstall effect automatically

function load() {
  scope.run(() => {
    useEntityCollection(viewer.entities)
  })
}
```
