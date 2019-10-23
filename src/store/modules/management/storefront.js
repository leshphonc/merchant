import storeFrontAPI from '@/api/management/storeFront'

// initial state
const state = {
  storeFrontList: [],
}

// getters
const getters = {}

// actions
const actions = {
  async getStoreFrontList({ commit }) {
    const data = await storeFrontAPI.getStoreFrontList()
    if (data) {
      commit('setStoreFrontList', data)
    }
  },
  async createStoreFront(context, payload) {
    return new Promise(async resolve => {
      const data = await storeFrontAPI.createStoreFront(payload)
      if (data) {
        resolve()
      }
    })
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
