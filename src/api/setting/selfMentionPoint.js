import axios from 'axios'

export default {
  // 查询自提点列表
  getSelfMentionPointList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=merchant', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
