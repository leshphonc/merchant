import commodityAPI from '@/api/management/commodity'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 电商商品列表
  async getECommerceCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  async deleteECommerceCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerceCommodity(payload)
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
