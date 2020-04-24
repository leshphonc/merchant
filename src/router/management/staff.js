import Index from '@/views/management/staff'

export default {
  path: '/staff',
  component: Index,
  children: [
    {
      // 店员列表
      path: '',
      component: () => import('@/views/management/staff/StaffDashboard'),
    },
    {
      // 店员编辑
      path: 'staffCRU/:id?/:sid?',
      component: () => import('@/views/management/staff/StaffCRU'),
    },
    {
      // 店员工作记录
      path: 'staffWorkRecord/:id?',
      component: () => import('@/views/management/staff/StaffWorkRecord'),
    },
  ],
}
