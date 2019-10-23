import axios from 'axios'

export default {
  getStoreFrontList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=store_lists', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  createStoreFront: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_store', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
