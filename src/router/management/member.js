import Index from '@/views/management/member'
import MemberDashboard from '@/views/management/member/MemberDashboard'

export default {
  path: '/member',
  component: Index,
  children: [
    {
      // 会员管理首页
      path: '',
      component: MemberDashboard,
    },
    {
      // 访问用户列表
      path: 'accessUserList',
      component: () => import('@/views/management/member/AccessUserList'),
    },
    {
      // 消费用户列表
      path: 'consumeUserList',
      component: () => import('@/views/management/member/ConsumeUserList'),
    },
    {
      // 绑定粉丝列表
      path: 'bindingFansList',
      component: () => import('@/views/management/member/BindingFansList'),
    },
    {
      // 商家基础会员卡信息
      path: 'basicMemberCard',
      component: () => import('@/views/management/member/BasicMemberCard'),
    },
    {
      // 领卡会员列表
      path: 'collarCardMemberList',
      component: () => import('@/views/management/member/CollarCardMemberList'),
    },
    {
      // 领卡会员编辑
      path: 'memberCardCRU/:id?',
      component: () => import('@/views/management/member/MemberCardCRU'),
    },
    {
      // 领卡会员充值记录
      path: 'memberCardAddCreditRecord/:id',
      component: () => import('@/views/management/member/MemberCardAddCreditRecord'),
    },
    {
      // 会员分组编辑
      path: 'memberGroupCRU/:id?',
      component: () => import('@/views/management/member/MemberGroupCRU'),
    },
    {
      // 领券会员列表
      path: 'collarCouponMemberList',
      component: () => import('@/views/management/member/CollarCouponMemberList'),
    },
  ],
}
