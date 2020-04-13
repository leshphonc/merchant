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
      // 零售商品编辑
      path: 'eCommerceCRU/:type/:id?',
      component: () => import('@/views/management/commodity/ECommerceCRU'),
    },
    {
      // 零售商品优惠编辑
      path: 'eCommercePreferential/:id',
      component: () => import('@/views/management/commodity/ECommercePreferential'),
    },
    {
      // 团购商品编辑
      path: 'groupBuyCRU/:id?',
      component: () => import('@/views/management/commodity/GroupBuyCRU'),
    },
    {
      // 团购商品优惠编辑
      path: 'groupBuyPreferential/:id',
      component: () => import('@/views/management/commodity/GroupBuyPreferential'),
    },
    {
      // 预定商品编辑
      path: 'reserveCRU/:id?',
      component: () => import('@/views/management/commodity/ReserveCRU'),
    },
    {
      // 预定商品优惠编辑
      path: 'reservePreferential/:id',
      component: () => import('@/views/management/commodity/ReservePreferential'),
    },
    {
      // 服务商品编辑
      path: 'serviceCRU/:id?',
      component: () => import('@/views/management/commodity/ServiceCRU'),
    },
    {
      // 服务商品优惠编辑
      path: 'servicePreferential/:id',
      component: () => import('@/views/management/commodity/ServicePreferential'),
    },
    {
      // 服务商品销售记录
      path: 'serviceSalesRecord/:id',
      component: () => import('@/views/management/commodity/ServiceSalesRecord'),
    },
    {
      // 套餐商品编辑
      path: 'packageCRU/:id?',
      component: () => import('@/views/management/commodity/PackageCRU'),
    },
    {
      // 套餐商品优惠编辑
      path: 'packagePreferential/:id',
      component: () => import('@/views/management/commodity/PackagePreferential'),
    },
    {
      // 套餐商品销售记录
      path: 'packageSalesRecord/:id',
      component: () => import('@/views/management/commodity/PackageSalesRecord'),
    },
    {
      // 组合卡编辑
      path: 'combinationCardCRU/:id?',
      component: () => import('@/views/management/commodity/CombinationCardCRU'),
    },
    {
      // 组合卡优惠编辑
      path: 'combinationCardPreferential/:id',
      component: () => import('@/views/management/commodity/CombinationCardPreferential'),
    },
    {
      // 组合卡销售记录
      path: 'combinationCardSalesRecord/:id',
      component: () => import('@/views/management/commodity/CombinationCardSalesRecord'),
    },
  ],
}
