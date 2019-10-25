import Index from '@/views/management/storeFront'
import StoreFrontList from '@/views/management/storeFront/StoreFrontList'

export default {
  path: '/storefront',
  component: Index,
  children: [
    {
      path: '/',
      component: StoreFrontList,
    },
    {
      path: 'storefrontCRU/:id?',
      component: () => import('@/views/management/storeFront/StoreFrontCRU'),
    },
  ],
}
