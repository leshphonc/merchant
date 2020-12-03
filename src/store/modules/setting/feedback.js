import feedbackAPI from '@/api/setting/feedback'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取评价列表
  async getFeedbackTypeList() {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.getFeedbackTypeList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建评价类型
  async createFeedbackType(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.createFeedbackType(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 更新评价类型
  async updateFeedbackType(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.updateFeedbackType(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 删除评价类型
  async deleteFeedbackType(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.deleteFeedbackType(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取用户评价列表
  async getFeedbackList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.getFeedbackList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取评价意图列表
  async getFeedbackIntentList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.getFeedbackIntentList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取评价类型列表
  async getFeedbackTypeList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.getFeedbackTypeList(payload)
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
