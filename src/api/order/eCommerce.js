import axios from 'axios'

export default {
  // 获取零售订单列表
  getECommerceList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=new_shop_order', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取零售订单详情
  getECommerceOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=new_shop_order_detail', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
