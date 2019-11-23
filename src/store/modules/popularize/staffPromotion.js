import staffPromotionAPI from '@/api/popularize/staffPromotion'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取扫码记录
  async getScanCodeRecord() {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getScanCodeRecord()
      data ? resolve(data) : reject()
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
