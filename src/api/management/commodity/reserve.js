import axios from 'axios'

export default {
  // 读取预定商品列表
  getReserveList: page =>
    axios.post('/appapi.php?c=Merchantapp&a=apro', {
      page,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建预定商品
  createReserve: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_appoint', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改预定商品
  updateReserve: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_appoint', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询预定商品详情
  readReserveDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=get_appoint', {
      params: {
        appoint_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 修改预定商品优惠
  updateReservePreferential: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=appoint_other', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取平台预定商品分类
  getPlatformReserveCategoryList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=get_all_appoint_category', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
