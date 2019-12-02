import axios from 'axios'

export default {
  // 推广统计数据
  getPromotionStatistics: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=spread_date', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 推广统计员工列表
  getPromotionStatisticsStaffList: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=spread_date_staff', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 扫码记录
  getScanCodeRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=spread_date_scan_list', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取绑粉记录
  getBindingFansRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=spread_date_fans_list', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取购买记录
  getBuyersRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=spread_date_sale_list', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
