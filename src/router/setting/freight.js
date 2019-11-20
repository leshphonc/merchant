import Index from '@/views/setting/freight'
import FreightTemplateList from '@/views/setting/freight/FreightTemplateList'

export default {
  path: '/freight',
  component: Index,
  children: [
    {
      // 运费模版列表
      path: '',
      component: FreightTemplateList,
    },
    {
      // 运费模版编辑
      path: 'freightTemplateCRU/:id?',
      component: () => import('@/views/setting/freight/FreightTemplateCRU'),
    },
  ],
}
