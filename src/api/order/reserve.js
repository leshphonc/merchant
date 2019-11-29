import axios from 'axios'

export default {
  // 预定订单列表
  getReserveList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=appoint_order_list', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 查询预定订单详情
  readReserveOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=appoint_order_detail', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 预定服务指派服务者
  dispatchReserveOrder: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=send_orders', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 验证预定服务
  verifyReserveOrder: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=appointVerify', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
