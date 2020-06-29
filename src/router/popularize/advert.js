import Index from '@/views/popularize/advert'

export default {
  path: '/advert',
  component: Index,
  children: [
    {
      // 广告订单列表
      path: '',
      component: () => import('@/views/popularize/advert/List'),
    },
  ],
}
