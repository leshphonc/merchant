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
}
