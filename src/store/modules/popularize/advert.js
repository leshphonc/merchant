import advertAPI from '@/api/popularize/advert'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取广告订单列表
  async getAdvertList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await advertAPI.getAdvertList(payload)
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
