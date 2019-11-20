import Index from '@/views/setting/selfMentionPoint'
import SelfMentionPointList from '@/views/setting/selfMentionPoint/SelfMentionPointList'

export default {
  path: '/selfMentionPoint',
  component: Index,
  children: [
    {
      // 自提点列表
      path: '',
      component: SelfMentionPointList,
    },
    {
      // 自提点编辑
      path: 'selfMentionPointCRU/:id?',
      component: () => import('@/views/setting/selfMentionPoint/SelfMentionPointCRU'),
    },
  ],
}
