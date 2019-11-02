import axios from 'axios'

export default {
  // 读取套餐商品列表
  getPackageCommodityList: page =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      page,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建套餐商品
  createPackageCommodity: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=addMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询套餐商品
  readPackageCommodityDetail: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除套餐商品
  deletePackageCommodity: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delMeal', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取套餐商品销售记录
  readPackageCommoditySalesRecord: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=.........', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
}
