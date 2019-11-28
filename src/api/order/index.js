import axios from 'axios'
import reserveAPI from './reserve'
import groupBuy from './groupBuy'

export default {
  getOrderTypeList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=order_list_all', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  ...reserveAPI,
  ...groupBuy,
}
