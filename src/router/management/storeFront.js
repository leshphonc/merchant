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
    {
      // 商铺商品管理
      path: 'storeFrontCommodityManagement/:id',
      component: () => import('@/views/management/storeFront/StoreFrontCommodityManagement'),
    },
    {
      // 商铺业务信息配置
      path: 'storeFrontBusiness/:id',
      component: () => import('@/views/management/storeFront/StoreFrontBusiness'),
    },
    {
      // 商铺零售配置编辑
      path: 'eCommerceSetting/:id',
      component: () => import('@/views/management/storeFront/components/ECommerceSetting'),
    },
    {
      // 商铺零售优惠编辑
      path: 'eCommerceSettingPreferential/:id',
      component: () => import('@/views/management/storeFront/components/ECommerceSettingPreferential'),
    },
    {
      // 商铺服务配置
      path: 'serviceSetting/:id',
      component: () => import('@/views/management/storeFront/components/ServiceSetting'),
    },
  ],
}
