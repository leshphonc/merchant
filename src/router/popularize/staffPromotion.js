import Index from '@/views/popularize/staffPromotion'

export default {
  path: '/staffPromotion',
  component: Index,
  children: [
    {
      // 店员推广
      path: '',
      component: () => import('@/views/popularize/staffPromotion/PromotionDashboard'),
    },
    {
      // 店员推广详情
      path: 'promotionDetail/:id/:stime/:etime',
      component: () => import('@/views/popularize/staffPromotion/PromotionDetail'),
    },
  ],
}
