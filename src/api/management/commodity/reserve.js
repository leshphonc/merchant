import axios from 'axios'

export default {
  // 读取预定商品列表
  getReserveCommodityList: page =>
    axios.post('/appapi.php?c=Merchantapp&a=apro', {
      page,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建预定商品
  createReserveCommodity: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=addMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询预定商品
  readReserveCommodityDetail: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改预定商品
  updateReserveCommodity: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=editMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除预定商品
  deleteReserveCommodity: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delMeal', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取预定内包含的服务项目
  readServiceOfReserveCommodity: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealProList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取预定商品销售记录
  readReserveCommoditySalesRecord: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=.........', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取平台预定分类
  getPlatformReserveCommodityCategoryList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=get_all_appoint_category', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
