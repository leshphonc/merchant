import axios from 'axios'

export default {
  // 获取广告订单列表
  getAdvertList: payload =>
    axios.get('/appapi.php?c=Tracking&a=buyAdList', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
