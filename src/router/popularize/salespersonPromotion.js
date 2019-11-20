import Index from '@/views/popularize/salespersonPromotion'
import PromotionDashboard from '@/views/popularize/salespersonPromotion/PromotionDashboard'

export default {
  path: '/salespersonPromotion',
  component: Index,
  children: [
    {
      // 店员推广
      path: '',
      component: PromotionDashboard,
    },
    {
      // 扫码记录
      path: 'scanCodeRecord',
      component: () => import('@/views/popularize/salespersonPromotion/ScanCodeRecord'),
    },
    {
      // 绑粉记录
      path: 'bindingFansRecord',
      component: () => import('@/views/popularize/salespersonPromotion/BindingFansRecord'),
    },
    {
      // 购买记录
      path: 'buyersRecord',
      component: () => import('@/views/popularize/salespersonPromotion/BuyersRecord'),
    },
  ],
}
