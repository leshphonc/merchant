import Index from '@/views/popularize/gift'

export default {
  path: '/gift',
  component: Index,
  children: [
    {
      // 礼品列表
      path: '',
      component: () => import('@/views/popularize/gift/GiftList'),
    },
    {
      // 礼品编辑
      path: 'giftCRU/:id?',
      component: () => import('@/views/popularize/gift/GiftCRU'),
    },
  ],
}
