import axios from 'axios'

export default {
  // 店铺列表
  getStoreFrontList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=store_lists', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建店铺
  createStoreFront: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_store', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 店铺详情
  getStoreFrontDetail: id =>
    axios.post('/appapi.php?c=Merchantapp&a=store_details', {
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 编辑店铺
  updateStoreFront: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_store', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 平台店铺分类
  getPlatformStoreFrontCategory: () =>
    axios.post('/appapi.php?c=Merchantapp&a=get_all_category', {
      ticket: localStorage.getItem('ticket'),
    }),
}
