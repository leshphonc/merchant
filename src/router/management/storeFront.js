import Index from '@/views/management/storeFront'
import StoreFrontList from '@/views/management/storeFront/StoreFrontList'

export default {
  path: '/storeFront',
  component: Index,
  children: [
    {
      // 商铺列表
      path: '',
      component: StoreFrontList,
    },
    {
      // 商铺编辑
      path: 'storeFrontCRU/:id?',
      component: () => import('@/views/management/storeFront/StoreFrontCRU'),
    },
  ],
}
