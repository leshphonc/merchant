import homeAPI from '@/api/home'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  async getHomeInfo() {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getHomeInfo()
      data ? resolve(data) : reject()
    })
  },
  // echart收入总数
  async getIncomeEchartData(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getIncomeEchartData(payload)
      data ? resolve(data) : reject()
    })
  },
  // echart订单总数
  async getOrderEchartData(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getOrderEchartData(payload)
      data ? resolve(data) : reject()
    })
  },
  // echart粉丝总数
  async getFansEchartData(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getFansEchartData(payload)
      data ? resolve(data) : reject()
    })
  },
  // echart访问人数
  async getVisitsPersonEchartData(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getVisitsPersonEchartData(payload)
      data ? resolve(data) : reject()
    })
  },
  // echart访问次数
  async getVisitsNumEchartData(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getVisitsNumEchartData(payload)
      data ? resolve(data) : reject()
    })
  },
  async getVisitsFaceEchartData(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getVisitsFaceEchartData(payload)
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
