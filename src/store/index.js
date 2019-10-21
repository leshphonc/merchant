import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import storefront from './modules/management/storefront'
import home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    ...actions,
  },
  modules: {
    storefront,
    home,
  },
})
