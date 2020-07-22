import axios from 'axios'
import eCommerceAPI from './eCommerce'
import reserveAPI from './reserve'
import groupBuy from './groupBuy'
// import takeAwayAPI from './takeAway'
import serviceAPI from './service'
import packageAPI from './package'
import combinationCardAPI from './combinationCard'

export default {
  ...eCommerceAPI,
  ...reserveAPI,
  ...groupBuy,
  // ...takeAwayAPI,
  ...serviceAPI,
  ...packageAPI,
  ...combinationCardAPI,
  // 更改商品售卖状态
  changeCommodityStatus: payload =>
    axios.post('/appapi.php?c=MerchantApp&a=changeStatus', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
