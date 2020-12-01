import Index from '@/views/management/smartScreen'

export default {
  path: '/smartScreen',
  component: Index,
  children: [
    {
      // 智能屏推广
      path: '',
      component: () => import('@/views/management/smartScreen/SmartScreenDashboard'),
    },
    {
      // 智能屏设备列表
      path: 'smartScreenList',
      component: () => import('@/views/management/smartScreen/SmartScreenList'),
    },
    {
      // 智能屏布局内容
      path: 'smartScreenLayout/:imax',
      component: () => import('@/views/management/smartScreen/SmartScreenLayout'),
    },
    {
      // 智能屏机器人管理
      path: 'smartScreenChatRecord',
      component: () => import('@/views/management/smartScreen/SmartScreenChatRecord'),
    },
    {
      // 智能屏销售记录
      path: 'smartScreenSalesRecord/:id/:imax',
      component: () => import('@/views/management/smartScreen/SmartScreenSalesRecord'),
    },
    {
      // 屏幕推广海报列表
      path: 'smartScreenPosterList',
      component: () => import('@/views/management/smartScreen/SmartScreenPosterList'),
    },
    {
      // 屏幕推广海报编辑
      path: 'smartScreenPosterCRU/:id?',
      component: () => import('@/views/management/smartScreen/SmartScreenPosterCRU'),
    },
    {
      // 屏幕推广数据统计
      path: 'smartScreenPromotionStatistics/:id',
      component: () => import('@/views/management/smartScreen/SmartScreenPromotionStatistics'),
    },
    {
      // 同城咨询
      path: 'sameCityAdvisory/:imax?',
      component: () => import('@/views/management/smartScreen/SameCityAdvisory'),
    },
    {
      // 联盟推广管理
      path: 'aroundPush',
      component: () => import('@/views/management/smartScreen/AroundPushManage'),
    },
    {
      // 联盟推广管理
      path: 'aroundPushList',
      component: () => import('@/views/management/smartScreen/AroundPushList'),
    },
    {
      // 机器人地图环境
      path: 'workspace/:imei',
      component: () => import('@/views/management/smartScreen/Workspace'),
    },
    // {
    //   // 顾客见面语列表
    //   path: 'customerMeetGreetingList/:imax',
    //   component: () => import('@/views/management/smartScreen/CustomerMeetGreetingList'),
    // },
    // {
    //   // 顾客见面语编辑
    //   path: 'customerMeetGreetingCRU/:imax/:id?',
    //   component: () => import('@/views/management/smartScreen/CustomerMeetGreetingCRU'),
    // },
    // {
    //   // 员工见面语列表
    //   path: 'staffMeetGreetingList/:imax',
    //   component: () => import('@/views/management/smartScreen/StaffMeetGreetingList'),
    // },
    // {
    //   // 员工见面语编辑
    //   path: 'staffMeetGreetingCRU/:imax/:id?',
    //   component: () => import('@/views/management/smartScreen/StaffMeetGreetingCRU'),
    // },
    // {
    //   // 员工特殊见面语列表
    //   path: 'staffMeetGreetingSpecifyList/:imax/:id',
    //   component: () => import('@/views/management/smartScreen/StaffMeetGreetingSpecifyList'),
    // },
  ],
}
