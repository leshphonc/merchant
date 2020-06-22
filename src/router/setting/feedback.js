export default {
  path: '/feedback',
  component: () => import('@/views/setting/feedback'),
  children: [
    {
      // 自提点列表
      path: '',
      component: () => import('@/views/setting/feedback/typeCRU'),
    },
  ],
}
