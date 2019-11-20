import axios from 'axios'

export default {
  // 读取提现微信账户
  getWxAccount: () =>
    axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_info', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 提现
  withDraw: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=money_withdraw', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 充值记录
  topupRecord: page =>
    axios.get('/appapi.php?c=Merchantapp&a=money_merrecharge_list', {
      params: {
        page,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 提现记录
  withdrawRecord: (page, type) =>
    axios.get('/appapi.php?c=Merchantapp&a=money_withdraw_records', {
      params: {
        page,
        size: 10,
        type,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 收支记录
  incomeAndExpenditureRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=money_income_list', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取账户明细分类
  getCategory: () =>
    axios.get('/appapi.php?c=Merchantapp&a=get_alias_c_name3', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建订单
  createOrder: money =>
    axios.post('/appapi.php?c=Merchantapp&a=money_add', {
      money,
      ticket: localStorage.getItem('ticket'),
    }),
  // 检查订单
  checkOrder: payload =>
    axios.post('/appapi.php?c=MerchantPay&a=check', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取支付参数
  getPayInfo: payload =>
    axios.post('/appapi.php?c=MerchantPay&a=go_pay', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
