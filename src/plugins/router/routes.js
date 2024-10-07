export const routes = [
  {
    path: '',
    name: 'login',
    meta: { requiresAuth: false },
    component: () => import('@/layouts/blank.vue'),
    redirect: 'login',
    children: [
      {
        path: 'login',
        component: () => import('@/pages/login.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: 'login',
        component: () => import('@/pages/[...error].vue'), // Para rutas no encontradas
      },
    ],
  },
  {
    path: '/sugas',
    name: 'sugas',
    meta: { requiresAuth: true },
    component: () => import('@/layouts/default.vue'),

    redirect: 'sugas/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/pages/dashboard.vue'),
      },
      {
        path: 'account-settings',
        component: () => import('@/pages/account-settings.vue'),
      },
      {
        path: 'typography',
        component: () => import('@/pages/typography.vue'),
      },
      {
        path: 'programa',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/programa/programa.vue'),
      },
      {
        path: 'programa-asignar',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/programa/asignarCompetencias.vue'),
      },
      {
        path: 'ver-programas',
        component: () => import('@/pages/programa/verProgramas.vue'),
      },
      {
        path: 'competencia',
        component: () => import('@/pages/competencia/competencia.vue'),
      },
      {
        path: 'icons',
        component: () => import('@/pages/icons.vue'),
      },
      {
        path: 'cards',
        component: () => import('@/pages/cards.vue'),
      },
      {
        path: 'tables',
        component: () => import('@/pages/tables.vue'),
      },
      {
        path: 'form-layouts',
        component: () => import('@/pages/form-layouts.vue'),
      },
      {
        path: 'register',
        meta: { requiresAdmin: true },
        component: () => import('@/pages/register.vue'),
      },
    ],
  },
]
