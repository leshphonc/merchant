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
  // 店铺资质审核
  async storeFroontQualificationAudit(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.storeFroontQualificationAudit(payload)
      data ? resolve() : reject()
    })
  },
  // 读取店铺下绑定的电商商品列表
  async getStoreFrontBindECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindECommerceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下绑定的服务商品列表
  async getStoreFrontBindServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下绑定的套餐商品列表
  async getStoreFrontBindPackageList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindPackageList(payload)
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
