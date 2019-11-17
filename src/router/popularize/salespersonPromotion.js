import Index from '@/views/popularize/salespersonPromotion'
import PromotionDashboard from '@/views/popularize/salespersonPromotion/PromotionDashboard'

export default {
  path: '/salespersonPromotion',
  component: Index,
  children: [
    {
      path: '',
      component: PromotionDashboard,
    },
    {
      path: 'scanCodeRecord',
      component: () => import('@/views/popularize/salespersonPromotion/ScanCodeRecord'),
    },
    {
      path: 'bindingFansRecord',
      component: () => import('@/views/popularize/salespersonPromotion/BindingFansRecord'),
    },
    {
      path: 'buyersRecord',
      component: () => import('@/views/popularize/salespersonPromotion/BuyersRecord'),
    },
  ],
}
