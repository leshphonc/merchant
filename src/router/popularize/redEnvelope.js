import Index from '@/views/popularize/redEnvelope'
import RedEnvelopeList from '@/views/popularize/redEnvelope/RedEnvelopeList'

export default {
  path: '/redEnvelope',
  component: Index,
  children: [
    {
      path: '',
      component: RedEnvelopeList,
    },
    {
      path: 'redEnvelopeCRU/:id?',
      component: () => import('@/views/popularize/redEnvelope/RedEnvelopeCRU'),
    },
    {
      path: 'redEnvelopeReceivingRecord/:id?',
      component: () => import('@/views/popularize/redEnvelope/RedEnvelopeReceivingRecord'),
    },
  ],
}
