const routes = [
  {
    path: '/',
    component: () => import('layouts/login.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Login.vue'),
        name: 'login'
      }
    ]
  },
  {
    path: '/scorekeeper',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'scorekeeper',
        component: () => import('pages/ScoreKeeperComponent.vue'),
        meta: {
          authenticate: true
        }
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('pages/dashboardComponent.vue'),
        meta: {
          authenticate: true
        }
      }
    ]
  },
  {
    path: '/moderator',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'moderator',
        component: () => import('pages/ModeratorComponent.vue'),
        meta: {
          authenticate: true
        }
      }
    ]
  },
  {
    path: '/timekeeper',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'timeKeeper',
        component: () => import('pages/TimeKeeperComponent.vue'),
        meta: {
          authenticate: true
        }
      }
    ]
  },
  {
    path: '/generalscreen',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'generalScreen',
        component: () => import('pages/GeneralScreenComponent.vue'),
        meta: {
          authenticate: false
        }
      }
    ]
  }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
