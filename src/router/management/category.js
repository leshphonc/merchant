import Index from '@/views/management/category'

export default {
    path: '/category',
    component: Index,
    children: [
        {
            // 分类列表
            path: '',
            component: () => import('@/views/management/category/CategoryList'),
        },
    ]
}
