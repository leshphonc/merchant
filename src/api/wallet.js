import axios from 'axios'

export default {
  // 读取提现微信账户
  readWxAccount: () =>
    axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_info', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
