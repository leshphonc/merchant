import axios from 'axios'

export default {
    // 获取商品分类列表
    getCategoryList: payload =>
        axios.post('/appapi.php?c=SpaceMerchant&a=listCate', {
            ...payload,
            ticket: localStorage.getItem('ticket'),
        }),
    // 添加或修改分类
    createOrModifyCategory: payload =>
        axios.post('/appapi.php?c=SpaceMerchant&a=addEditCate', {
            ...payload,
            ticket: localStorage.getItem('ticket'),
        }),
    // 删除分类
    deleteCategory: id =>
        axios.post('/appapi.php?c=SpaceMerchant&a=delCate', {
            id,
            ticket: localStorage.getItem('ticket'),
        }),
    // 获取分类下有商品的分类
    getHasGoodsCategory: payload =>
        axios.post('/appapi.php?c=Merchantimax&a=categoryWithCommodity', {
            ...payload,
            ticket: localStorage.getItem('ticket'),
        })

}