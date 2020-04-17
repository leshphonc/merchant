import Index from '@/views/popularize/transfer'

export default {
  path: '/transfer',
  component: Index,
  children: [
    {
      // 礼品列表
      path: '',
      component: () => import('@/views/popularize/transfer/CombinationCardList'),
    },
  ],
}
