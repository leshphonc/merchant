import commodityAPI from '@/api/management/commodity'

// initial state
const state = {
  navText: ['创建', '创建', '创建', '创建'],
}

// getters
const getters = {}

// actions
const actions = {
  // 读取电商商品列表
  async getECommerceCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  // 删除电商商品
  async deleteECommerceCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerceCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 读取电商商品1级分类
  async getECommerceCommodityFirstCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceCommodityFirstCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 读取电商商品2级分类
  async getECommerceCommoditySecondCategoryList(context, sort_id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceCommoditySecondCategoryList(sort_id)
      data ? resolve(data) : reject()
    })
  },
  // 读取平台电商商品分类
  async getPlatformEcommerceCommodityCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformEcommerceCommodityCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 新增电商分类
  async createECommerceCommodityCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createECommerceCommodityCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 删除电商分类
  async deleteECommerceCommodityCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerceCommodityCategory(payload)
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
  changeRightText(state, { index, text }) {
    const arr = state.navText
    arr[index] = text
    state.navText = []
    state.navText = arr
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
