import axios from 'axios'

export default {
  // 获取服务订单列表
  getCombinationCardList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=service_card_lists', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取服务订单详情
  getCombinationCardOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=card_meal_info', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
