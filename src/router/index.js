import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index'
import Home from '@/views/Home'
import StoreFrontRoute from '@/views/management/storeFront/StoreFrontRoute'
import StoreFrontList from '@/views/management/storeFront/StoreFrontList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '/',
        component: Home,
      },
      {
        path: '/mine',
        component: () => import('@/views/Mine'),
      },
    ],
  },
  {
    path: '/storefront',
    component: StoreFrontRoute,
    children: [
      {
        path: '/',
        component: StoreFrontList,
      },
      {
        path: 'storefrontCRU',
        component: () => import('@/views/management/storeFront/StoreFrontCRU'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    // route level code-splitting
    // this generates a separate chunk (login.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/views/404'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
