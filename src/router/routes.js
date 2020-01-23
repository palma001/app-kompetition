const routes = [
  {
    path: '/',
    component: () => import('layouts/login.vue'),
    children: [
      {
        path: '/',
        component: () => import('pages/Login.vue'),
        name: 'login',
        meta: {
          authenticate: false
        }
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
        name: 'timekeeper',
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
  },
  {
    path: '/sortingScreen',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'sortingScreen',
        component: () => import('pages/SortingScreen.vue')
      }
    ]
  },
  {
    path: '/sortingScreenFinal',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'sortingScreenFinal',
        component: () => import('pages/SortingFinalComponent.vue'),
        meta: {
          authenticate: false
        }
      }
    ]
  },
  {
    path: '/admin',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin',
        component: () => import('pages/admin.vue'),
        meta: {
          authenticate: true
        }
      }
    ]
  }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    redirect: {
      name: 'login'
    }
  })
}

export default routes
