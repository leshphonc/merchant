import axios from 'axios'

export default {
  // 电商商品列表
  getECommerceCommodityList: page =>
    axios.get('/appapi.php?c=SpaceMerchant&a=spro', {
      params: {
        page,
        size: 10,
        good_type: 1,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 删除电商商品
  deleteECommerceCommodity: ({ store_id, goods_id }) =>
    axios.post('/appapi.php?c=SpaceMerchant&a=goods_del', {
      store_id,
      goods_id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 电商商品1级分类
  getECommerceCommodityFirstCategoryList: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=getShopCate', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 电商商品2级分类
  getECommerceCommoditySecondCategoryList: sort_id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getShopTwoCate', {
      sort_id,
      ticket: localStorage.getItem('ticket'),
    }),
}
