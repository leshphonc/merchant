import axios from 'axios'

export default {
  // 获取服务订单列表
  getArrivalList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=store_order_list', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取服务订单详情
  getArrivalOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=store_order_detail', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取到店消费店铺列表
  getArrivalOrderStoreList: id =>
    axios.post('/appapi.php?c=Merchantapp&a=getStoreStaff', {
      mer_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
}
