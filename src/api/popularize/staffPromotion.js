import axios from 'axios'

export default {
  // 扫码记录
  getScanCodeRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=spread_date_scan_list', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 推广统计数据
  getPromotionStatistics: promotion =>
    axios.get('/appapi.php?c=Merchantapp&a=spread_date', {
      params: {
        ...promotion,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 推广统计员工列表
  getPromotionStatisticsStaffList: promotion =>
    axios.get('/appapi.php?c=Merchantapp&a=spread_date_staff', {
      params: {
        ...promotion,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
