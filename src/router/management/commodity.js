import Index from '@/views/management/commodity'
import CommodityList from '@/views/management/commodity/CommodityList'

export default {
  path: '/commodity',
  component: Index,
  children: [
    {
      // 商品列表
      path: '/',
      component: CommodityList,
    },
    {
      // 电商商品编辑
      path: 'eCommerceCommodityCRU/:id?',
      component: () => import('@/views/management/commodity/ECommerceCommodityCRU'),
    },
    {
      // 电商商品优惠编辑
      path: 'eCommerceCommodityPreferential/:id',
      component: () => import('@/views/management/commodity/ECommerceCommodityPreferential'),
    },
    {
      // 服务商品编辑
      path: 'serviceCommodityCRU/:id?',
      component: () => import('@/views/management/commodity/ServiceCommodityCRU'),
    },
    {
      // 服务商品销售记录
      path: 'serviceCommoditySalesRecord/:id',
      component: () => import('@/views/management/commodity/ServiceCommoditySalesRecord'),
    },
    {
      // 套餐商品编辑
      path: 'packageCommodityCRU/:id?',
      component: () => import('@/views/management/commodity/PackageCommodityCRU'),
    },
  ],
}
