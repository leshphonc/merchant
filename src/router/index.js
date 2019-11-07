import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Home from '@/views/Home'
import Management from './management'
import Setting from './setting'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        component: Home,
      },
      {
        path: 'order',
        component: () => import('@/views/order'),
        children: [
          {
            path: '',
            component: () => import('@/views/order/OrderTypeCell'),
          },
          {
            path: 'groupList',
            component: () => import('@/views/order/GroupList'),
          },
          {
            path: 'groupOrderDetail/:id',
            component: () => import('@/views/order/GroupOrderDetail'),
          },
        ],
      },
      {
        path: 'marketing',
        component: () => import('@/views/Marketing'),
      },
      {
        path: 'mine',
        component: () => import('@/views/Mine'),
      },
    ],
  },
  ...Management,
  ...Setting,
  {
    path: '/login',
    name: 'login',

    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
  },
  {
    path: '*',
    name: '404',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "404" */ '@/views/404'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
