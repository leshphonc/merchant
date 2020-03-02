import Index from '@/views/popularize/reward'

export default {
  path: '/reward',
  component: Index,
  children: [
    {
      // 佣金管理首页
      path: '',
      component: () => import('@/views/management/commodity/CommodityList'),
    },
    {
      // 零售佣金分佣设置
      path: 'eCommerceReward/:id',
      component: () => import('@/views/popularize/reward/ECommerceReward'),
    },
    {
      // 预定佣金分佣设置
      path: 'reserveReward/:id',
      component: () => import('@/views/popularize/reward/ReserveReward'),
    },
    {
      // 团购佣金分佣设置
      path: 'groupBuyReward/:id',
      component: () => import('@/views/popularize/reward/GroupBuyReward'),
    },
    {
      // 服务佣金分佣设置
      path: 'serviceReward/:id',
      component: () => import('@/views/popularize/reward/ServiceReward'),
    },
    {
      // 套餐佣金分佣设置
      path: 'packageReward/:id',
      component: () => import('@/views/popularize/reward/PackageReward'),
    },
  ],
}
