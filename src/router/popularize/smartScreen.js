import Index from '@/views/popularize/smartScreen'

export default {
  path: '/smartScreen',
  component: Index,
  children: [
    {
      // 智能屏推广
      path: '',
      component: () => import('@/views/popularize/smartScreen/SmartScreenDashboard'),
    },
    {
      // 智能屏设备列表
      path: 'smartScreenList',
      component: () => import('@/views/popularize/smartScreen/SmartScreenList'),
    },
    {
      // 智能屏对话记录
      path: 'smartScreenChatRecord',
      component: () => import('@/views/popularize/smartScreen/SmartScreenChatRecord'),
    },
    {
      // 智能屏销售记录
      path: 'smartScreenSalesRecord/:imax',
      component: () => import('@/views/popularize/smartScreen/SmartScreenSalesRecord'),
    },
    {
      // 顾客见面语列表
      path: 'customerMeetGreetingList/:imax',
      component: () => import('@/views/popularize/smartScreen/CustomerMeetGreetingList'),
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
    {
      // 屏幕推广海报列表
      path: 'smartScreenPosterList',
      component: () => import('@/views/popularize/smartScreen/SmartScreenPosterList'),
    },
    {
      // 屏幕推广海报编辑
      path: 'smartScreenPosterCRU/:id?',
      component: () => import('@/views/popularize/smartScreen/SmartScreenPosterCRU'),
    },
    {
      // 屏幕推广商品列表
      path: 'smartScreenCommodityList/:imax',
      component: () => import('@/views/popularize/smartScreen/SmartScreenCommodityList'),
    },
  ],
}
