import commodityAPI from '@/api/management/commodity'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 电商商品列表
  async getCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建店铺
  async createStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createStoreFront(payload)
      data ? resolve() : reject()
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
