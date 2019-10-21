import axios from 'axios'

export default {
  getStoreFrontList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=store_lists', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
