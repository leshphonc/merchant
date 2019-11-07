import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import home from './modules/home'
import order from './modules/order'
import management from './modules/management'
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
    ...management,
    ...setting,
  },
})
