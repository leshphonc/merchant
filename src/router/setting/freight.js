import Index from '@/views/setting/freight'
import FreightTemplateList from '@/views/setting/freight/FreightTemplateList'

export default {
  path: '/freight',
  component: Index,
  children: [
    {
      path: '/',
      component: FreightTemplateList,
    },
    {
      path: 'freightTemplateCRU/:id?',
      component: () => import('@/views/setting/freight/FreightTemplateCRU'),
    },
  ],
}
