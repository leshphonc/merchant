import axios from 'axios'

export default {
  // 订单类别列表
  getMarketTypeList: () =>
    axios.post('/appapi.php?c=Merchantapp&a=marketing', {
      ticket: localStorage.getItem('ticket'),
    }),
}
