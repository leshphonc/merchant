import axios from 'axios'

export default {
  login: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=login', {
      ...payload,
    }),
  getProvince: () =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_province', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  getCity: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_city', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  getArea: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_area', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  getCircle: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_circle', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  getMarket: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_market', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
