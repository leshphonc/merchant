import eCommerceAPI from './eCommerce'
import reserveAPI from './reserve'
// import takeAwayAPI from './takeAway'
import serviceAPI from './service'
import packageAPI from './package'

export default {
  ...eCommerceAPI,
  ...reserveAPI,
  // ...takeAwayAPI,
  ...serviceAPI,
  ...packageAPI,
}
