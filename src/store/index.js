import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import storeFront from './modules/management/storeFront'
import home from './modules/home'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cascadeAddress: [],
  },
  mutations: {},
  actions: {
    ...actions,
  },
  modules: {
    storeFront,
    home,
  },
})
