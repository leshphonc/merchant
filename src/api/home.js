import axios from 'axios'

export default {
  // 首页信息
  getHomeInfo: () =>
    axios.get('/appapi.php?c=Merchantapp&a=index', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // echart收入总数
  getIncomeEchartData: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=all_money', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // echart订单总数
  getOrderEchartData: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=all_order', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // echart粉丝总数
  getFansEchartData: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=all_fans', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // echart访问人数
  getVisitsPersonEchartData: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=all_visit', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // echart访问次数
  getVisitsNumEchartData: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=all_visit_num', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // // echart进店人数（老）
  // getVisitsFaceEchartData: payload =>
  //   axios.get('/appapi.php?c=Merchantapp&a=all_face_visit', {
  //     params: {
  //       ...payload,
  //       ticket: localStorage.getItem('ticket'),
  //     },
  //   }),
  // echart进店人数（新）
  getVisitsFaceEchartData: payload => {
    return new Promise(async (resolve, reject) => {
      const data = axios.get('/appapi.php?c=Tracking&a=peopleStream', {
        params: {
          ...payload,
          ticket: localStorage.getItem('ticket'),
        },
      })
      data ? resolve(data) : reject()
    })
  },
}
