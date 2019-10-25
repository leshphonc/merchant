import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import home from './modules/home'
import management from './modules/management'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {
    ...actions,
  },
  modules: {
    home,
    ...management,
  },
})
