import axios from 'axios'
import groupAPI from './group'

export default {
  // 订单类别列表
  getOrderTypeList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=order_list_all', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  ...groupAPI,
}
