import eCommerceAPI from './eCommerce'
import serviceAPI from './service'
import packageAPI from './package'

export default {
  ...eCommerceAPI,
  ...serviceAPI,
  ...packageAPI,
}
