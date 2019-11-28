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
    axios.post('/appapi.php?c=Merchantapp&a=add_appoint', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改预定商品
  updateReserveCommodity: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_appoint', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询预定商品详情
  readReserveCommodityDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=get_appoint', {
      params: {
        appoint_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 修改预定商品优惠
  updateReserveCommodityPreferential: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=appoint_other', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取平台预定商品分类
  getPlatformReserveCommodityCategoryList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=get_all_appoint_category', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
