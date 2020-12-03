import marketAPI from '@/api/market'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取订单类别列表
  async getMarketTypeList() {
    return new Promise(async (resolve, reject) => {
      const data = await marketAPI.getMarketTypeList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}

// mutations
const mutations = {
  save(state, data) {
    const keys = Object.keys(data)
    keys.forEach(item => {
      state[item] = data[item]
    })
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
