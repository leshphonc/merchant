import axios from 'axios'
import reserveAPI from './reserve'
import takeAwayAPI from './takeAway'
import groupBuyAPI from './groupBuy'
import serviceAPI from './service'
import packageAPI from './package'
import eCommerceAPI from './eCommerce'

export default {
  getOrderTypeList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=order_list_all', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  //  获取外卖订单状态列表
  getOrderStatusList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=shop_status_list', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  ...reserveAPI,
  ...takeAwayAPI,
  ...groupBuyAPI,
  ...serviceAPI,
  ...packageAPI,
  ...eCommerceAPI,
}
