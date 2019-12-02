import Index from '@/views/popularize/smartScreen'

export default {
  path: '/smartScreen',
  component: Index,
  children: [
    {
      // 智能屏设备列表
      path: '',
      component: () => import('@/views/popularize/smartScreen/SmartScreenList.vue'),
    },
    {
      // 顾客见面语列表
      path: 'customerMeetGreetingList/:imax',
      component: () => import('@/views/popularize/smartScreen/CustomerMeetGreetingList.vue'),
    },
    {
      // 顾客见面语编辑
      path: 'customerMeetGreetingCRU/:imax/:id?',
      component: () => import('@/views/popularize/smartScreen/CustomerMeetGreetingCRU'),
    },
    {
      // 员工见面语列表
      path: 'staffMeetGreetingList/:imax',
      component: () => import('@/views/popularize/smartScreen/StaffMeetGreetingList'),
    },
    {
      // 员工见面语编辑
      path: 'staffMeetGreetingCRU/:imax/:id?',
      component: () => import('@/views/popularize/smartScreen/StaffMeetGreetingCRU'),
    },
    {
      // 员工特殊见面语列表
      path: 'staffMeetGreetingSpecifyList/:imax/:id',
      component: () => import('@/views/popularize/smartScreen/StaffMeetGreetingSpecifyList'),
    },
  ],
}
