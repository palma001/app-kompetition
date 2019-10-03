function validateAll (to, from, next) {
  const appModule = to.path.split('/')[1]
  next()
  console.log(appModule)
}
const routes = [
  {
    path: '/login',
    component: () => import('layouts/login.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/scoreKeeper',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/ScoreKeeperComponent.vue'),
        beforeEnter: validateAll
      }
    ]
  },
  {
    path: '/dashboard',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/dashboardComponent.vue') }
    ]
  },
  {
    path: '/moderator',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      { path: '', component: () => import('pages/ScoreKeeperComponent.vue') }
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
