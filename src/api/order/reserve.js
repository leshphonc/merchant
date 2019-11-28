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
}
