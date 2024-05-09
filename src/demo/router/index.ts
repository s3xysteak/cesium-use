import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  // @ts-expect-error - demo has been ignored.
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
