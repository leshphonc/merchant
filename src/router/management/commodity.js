import Index from '@/views/management/commodity'
import CommodityList from '@/views/management/commodity/CommodityList'

export default {
  path: '/commodity',
  component: Index,
  children: [
    {
      // 商品列表
      path: '',
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
      // 团购商品编辑
      path: 'groupBuyCommodityCRU/:id?',
      component: () => import('@/views/management/commodity/GroupBuyCommodityCRU'),
    },
    {
      // 团购商品优惠编辑
      path: 'groupBuyCommodityPreferential/:id',
      component: () => import('@/views/management/commodity/GroupBuyCommodityPreferential'),
    },
    {
      // 预定商品编辑
      path: 'reserveCommodityCRU/:id?',
      component: () => import('@/views/management/commodity/ReserveCommodityCRU'),
    },
    {
      // 预定商品优惠编辑
      path: 'reserveCommodityPreferential/:id',
      component: () => import('@/views/management/commodity/ReserveCommodityPreferential'),
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
    {
      // 套餐商品销售记录
      path: 'packageCommoditySalesRecord/:id',
      component: () => import('@/views/management/commodity/PackageCommoditySalesRecord'),
    },
  ],
}
