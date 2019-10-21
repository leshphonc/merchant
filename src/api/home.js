import axios from 'axios'

export default {
  getHomeInfo: () =>
    axios.get('/appapi.php?c=Merchantapp&a=index', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
