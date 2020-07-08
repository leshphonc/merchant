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
      data ? resolve(data) : reject()
    })
  },
  // 创建评价类型
  async createFeedbackType(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.createFeedbackType(payload)
      data ? resolve(data) : reject()
    })
  },
  // 更新评价类型
  async updateFeedbackType(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.updateFeedbackType(payload)
      data ? resolve(data) : reject()
    })
  },
  // 删除评价类型
  async deleteFeedbackType(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.deleteFeedbackType(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取用户评价列表
  async getFeedbackList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.getFeedbackList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取评价意图列表
  async getFeedbackIntentList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.getFeedbackIntentList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取评价类型列表
  async getFeedbackTypeList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await feedbackAPI.getFeedbackTypeList(payload)
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
