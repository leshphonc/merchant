import axios from 'axios'

export default {
  // 获取服务订单列表
  getServiceList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=service_order', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取服务订单详情
  getServiceOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=service_order_detail', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
