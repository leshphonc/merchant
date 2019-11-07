import Index from '@/views/management/storeFront'
import StoreFrontList from '@/views/management/storeFront/StoreFrontList'

export default {
  path: '/storeFront',
  component: Index,
  children: [
    {
      path: '',
      component: StoreFrontList,
    },
    {
      path: 'storeFrontCRU/:id?',
      component: () => import('@/views/management/storeFront/StoreFrontCRU'),
    },
  ],
}
