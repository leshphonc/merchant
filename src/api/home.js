import axios from 'axios'

export default {
  // 首页信息
  getHomeInfo: () =>
    axios.get('/appapi.php?c=Merchantapp&a=index', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
