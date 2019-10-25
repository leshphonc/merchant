import Index from '@/views/management/commodity'
import CommodityList from '@/views/management/commodity/CommodityList'

export default {
  path: '/commodity',
  component: Index,
  children: [
    {
      path: '/',
      component: CommodityList,
    },
    // {
    //   path: 'commodityCRU/:id?',
    //   component: () => import('@/views/management/storeFront/StoreFrontCRU'),
    // },
  ],
}
