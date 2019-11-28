import axios from 'axios'

export default {
  // 读取外卖商品列表
  getTakeAwayList: page =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      page,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建外卖商品
  createTakeAway: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=addMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询外卖商品
  readTakeAwayDetail: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改外卖商品
  updateTakeAway: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=editMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除外卖商品
  deleteTakeAway: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delMeal', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取外卖内包含的服务项目
  readServiceOfTakeAway: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealProList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取外卖商品销售记录
  readTakeAwaySalesRecord: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=.........', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
}
