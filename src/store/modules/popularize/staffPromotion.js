import staffPromotionAPI from '@/api/popularize/staffPromotion'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 推广统计数据
  async getPromotionStatistics(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getPromotionStatistics(payload)
      data ? resolve(data) : reject()
    })
  },
  // 推广统计员工列表
  async getPromotionStatisticsStaffList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getPromotionStatisticsStaffList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取扫码记录
  async getScanCodeRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getScanCodeRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取绑粉记录
  async getBindingFansRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getBindingFansRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取购买记录
  async getBuyersRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getBuyersRecord(payload)
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
