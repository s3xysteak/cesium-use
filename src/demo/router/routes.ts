import type { RouteRecordRaw } from 'vue-router'

const modules = import.meta.glob([
  '../../composables/*/demo.vue',
  '../../components/*/demo.vue',
  '../../utils/*/demo.vue',
])
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
