import storeFrontAPI from '@/api/management/storefront'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 店铺列表
  async getStoreFrontList() {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontList()
      data ? resolve(data) : reject()
    })
  },
  // 创建店铺
  async createStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 店铺详情
  async readStoreFrontDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.readStoreFrontDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 编辑店铺
  async updateStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 平台店铺分类
  async getPlatformStoreFrontCategory() {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getPlatformStoreFrontCategory()
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
