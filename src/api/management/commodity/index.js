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
}
