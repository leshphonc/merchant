import axios from 'axios'

export default {
  // 登录
  login: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=login', {
      ...payload,
    }),
  // 省份列表
  getProvince: () =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_province', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 城市列表
  getCity: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_city', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 地区列表
  getArea: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_area', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 商圈列表
  getCircle: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_circle', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 商盟列表
  getMarket: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_market', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
