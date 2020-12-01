import Index from '@/views/management/demand'

export default {
  path: '/demand',
  component: Index,
  children: [
    {
      // 列表
      path: '',
      component: () => import('@/views/management/demand/DemandList'),
    },
  ]
}
