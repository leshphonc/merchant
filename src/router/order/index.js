export default {
  path: 'order',
  component: () => import('@/views/order'),
  children: [
    {
      path: '',
      component: () => import('@/views/order/OrderTypeCell'),
    },
    {
      path: 'groupBuyList/:id?',
      component: () => import('@/views/order/GroupBuyList'),
    },
    {
      path: 'groupBuyOrderDetail/:id',
      component: () => import('@/views/order/GroupBuyOrderDetail'),
    },
    {
      path: 'reserveList/:id?',
      component: () => import('@/views/order/ReserveList'),
    },
    {
      path: 'reserveOrderDetail/:id',
      component: () => import('@/views/order/ReserveOrderDetail'),
    },
    {
      path: 'takeAwayList/:id?',
      component: () => import('@/views/order/TakeAwayList'),
    },
    {
      path: 'takeAwayOrderDetail/:id',
      component: () => import('@/views/order/TakeAwayOrderDetail'),
    },
    {
      path: 'serviceList/:id?',
      component: () => import('@/views/order/ServiceList'),
    },
    {
      path: 'serviceOrderDetail/:id',
      component: () => import('@/views/order/ServiceOrderDetail'),
    },
    {
      path: 'packageList/:id?',
      component: () => import('@/views/order/PackageList'),
    },
    {
      path: 'packageOrderDetail/:id',
      component: () => import('@/views/order/PackageOrderDetail'),
    },
    {
      path: 'eCommerceList/:id?',
      component: () => import('@/views/order/ECommerceList'),
    },
    {
      path: 'eCommerceOrderDetail/:id',
      component: () => import('@/views/order/ECommerceOrderDetail'),
    },
  ],
}
