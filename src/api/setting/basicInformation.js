import axios from 'axios'

export default {
  // 读取商户基本信息
  readMerchantInfo: () =>
    axios.get('/appapi.php?c=Merchantapp&a=merchant', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 基本信息编辑
  updateMerchantInfo: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=modify_merchant', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
