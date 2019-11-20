import Index from '@/views/popularize/redEnvelope'
import RedEnvelopeList from '@/views/popularize/redEnvelope/RedEnvelopeList'

export default {
  path: '/redEnvelope',
  component: Index,
  children: [
    {
      // 红包列表
      path: '',
      component: RedEnvelopeList,
    },
    {
      // 红包编辑
      path: 'redEnvelopeCRU/:id?',
      component: () => import('@/views/popularize/redEnvelope/RedEnvelopeCRU'),
    },
    {
      // 红包领取记录
      path: 'redEnvelopeReceivingRecord/:id?',
      component: () => import('@/views/popularize/redEnvelope/RedEnvelopeReceivingRecord'),
    },
  ],
}
