import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import home from './modules/home'
import order from './modules/order'
import market from './modules/market'
import wallet from './modules/wallet'
import management from './modules/management'
import popularize from './modules/popularize'
import setting from './modules/setting'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    ...actions,
  },
  modules: {
    home,
    order,
    market,
    wallet,
    ...management,
    ...popularize,
    ...setting,
  },
})
