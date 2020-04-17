import transferAPI from '@/api/popularize/transfer'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 查询可以过户的组合卡列表
  async getCombinationCardList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await transferAPI.getCombinationCardList(page)
      data ? resolve(data) : reject()
    })
  },
  // 组合卡过户操作
  async transferCombinationCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await transferAPI.transferCombinationCard(payload)
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
