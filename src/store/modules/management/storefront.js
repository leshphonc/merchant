import storefront from '@/api/management/storefront'

// initial state
const state = {
  storeFrontList: [],
}

// getters
const getters = {}

// actions
const actions = {
  async getStoreFrontList({ commit }) {
    const data = await storefront.getStoreFrontList()
    if (data) {
      commit('setStoreFrontList', data)
    }
  },
}

// mutations
const mutations = {
  setStoreFrontList(state, data) {
    state.storeFrontList = data
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
