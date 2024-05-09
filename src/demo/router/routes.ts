import type { RouteRecordRaw } from 'vue-router'

// @ts-expect-error - demo has been ignored.
const modules = import.meta.glob([
  '../../composables/*/demo.vue',
  '../../components/*/demo.vue',
  '../../utils/*/demo.vue',
])
// @ts-expect-error - demo has been ignored.
const demoList: RouteRecordRaw[] = Object.entries(modules).map(([key, val]) => {
  const [, name] = key.split('/').reverse()

  return {
    path: name,
    name,
    component: val,
  }
})

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    redirect: '/layout',
    component: () => import('../App.vue'),
    children: [
      {
        path: 'layout',
        name: 'layout',
        component: () => import('../layout.vue'),
      },
      {
        path: 'container',
        name: 'container',
        component: () => import('../container.vue'),
        children: [...demoList],
      },
    ],
  },
]
