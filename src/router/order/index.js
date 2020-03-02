export default {
  path: 'order',
  component: () => import('@/views/order'),
  children: [
    {
      path: '',
      component: () => import('@/views/order/OrderTypeCell'),
    },
    // 团购
    {
      path: 'groupBuyList/:id?',
      component: () => import('@/views/order/GroupBuyList'),
    },
    {
      path: 'groupBuyOrderDetail/:id',
      component: () => import('@/views/order/GroupBuyOrderDetail'),
    },
    // 预定
    {
      path: 'reserveList/:id?',
      component: () => import('@/views/order/ReserveList'),
    },
    {
      path: 'reserveOrderDetail/:id',
      component: () => import('@/views/order/ReserveOrderDetail'),
    },
    // 外卖
    {
      path: 'takeAwayList/:id?',
      component: () => import('@/views/order/TakeAwayList'),
    },
    {
      path: 'takeAwayOrderDetail/:id',
      component: () => import('@/views/order/TakeAwayOrderDetail'),
    },
    // 服务
    {
      path: 'serviceList/:id?',
      component: () => import('@/views/order/ServiceList'),
    },
    {
      path: 'serviceOrderDetail/:id',
      component: () => import('@/views/order/ServiceOrderDetail'),
    },
    // 套餐
    {
      path: 'packageList/:id?',
      component: () => import('@/views/order/PackageList'),
    },
    {
      path: 'packageOrderDetail/:id',
      component: () => import('@/views/order/PackageOrderDetail'),
    },
    // 零售
    {
      path: 'eCommerceList/:id?',
      component: () => import('@/views/order/ECommerceList'),
    },
    {
      path: 'eCommerceOrderDetail/:id',
      component: () => import('@/views/order/ECommerceOrderDetail'),
    },
    // 到店消费
    {
      path: 'arrivalList/:id?',
      component: () => import('@/views/order/ArrivalList'),
    },
    {
      path: 'arrivalOrderDetail/:id',
      component: () => import('@/views/order/ArrivalOrderDetail'),
    },
  ],
}
