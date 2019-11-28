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
  ],
}
