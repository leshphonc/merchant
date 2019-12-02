import Index from '@/views/popularize/staffPromotion'
import PromotionDashboard from '@/views/popularize/staffPromotion/PromotionDashboard'

export default {
  path: '/staffPromotion',
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
      component: () => import('@/views/popularize/staffPromotion/ScanCodeRecord'),
    },
    {
      // 绑粉记录
      path: 'bindingFansRecord',
      component: () => import('@/views/popularize/staffPromotion/BindingFansRecord'),
    },
    {
      // 购买记录
      path: 'buyersRecord',
      component: () => import('@/views/popularize/staffPromotion/BuyersRecord'),
    },
    {
      // 店员推广详情
      path: 'promotionDetail/:id',
      component: () => import('@/views/popularize/staffPromotion/promotionDetail'),
    },
  ],
}
