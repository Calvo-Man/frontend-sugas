import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

import store from '../../../store/index'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Middleware para autenticación
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isAuthenticated) {
      next(from)
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (store.state.user.rol !== 'admin') {
        next({ path: 'sugas' }) // Si no es admin, redirige al home
      } else {
        next()
      }
    } else {
      next()
    }
  } else {
    next()
  }
})

export default function (app) {
  app.use(router)
}
export { router }
