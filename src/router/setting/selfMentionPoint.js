import Index from '@/views/setting/selfMentionPoint'
import SelfMentionPointList from '@/views/setting/selfMentionPoint/SelfMentionPointList'

export default {
  path: '/selfMentionPoint',
  component: Index,
  children: [
    {
      path: '',
      component: SelfMentionPointList,
    },
    {
      path: 'selfMentionPointCRU/:id?',
      component: () => import('@/views/setting/selfMentionPoint/SelfMentionPointCRU'),
    },
  ],
}
