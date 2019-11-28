export default {
  path: 'order',
  component: () => import('@/views/order'),
  children: [
    {
      path: '',
      component: () => import('@/views/order/OrderTypeCell'),
    },
    {
      path: 'groupList/:id?',
      component: () => import('@/views/order/GroupBuyList'),
    },
    {
      path: 'groupOrderDetail/:id',
      component: () => import('@/views/order/GroupBuyOrderDetail'),
    },
  ],
}
