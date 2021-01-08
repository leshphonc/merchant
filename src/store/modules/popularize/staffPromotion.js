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
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 推广统计员工列表
  async getPromotionStatisticsStaffList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getPromotionStatisticsStaffList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取扫码记录
  async getScanCodeRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getScanCodeRecord(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取绑粉记录
  async getBindingFansRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getBindingFansRecord(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取购买记录
  async getBuyersRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffPromotionAPI.getBuyersRecord(payload)
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
