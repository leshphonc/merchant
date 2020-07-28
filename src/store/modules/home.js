import homeAPI from '@/api/home'

// initial state
const state = {
  money: '0',
  swipe: [],
  total_earn: '0',
  total_fans: '0',
  total_order: '0',
  total_visit: '0',
  total_visit_num: '0',
}

// getters
const getters = {}

// actions
const actions = {
  async getHomeInfo({ commit }) {
    return new Promise(async (resolve, reject) => {
      const data = await homeAPI.getHomeInfo()
      if (data) {
        commit('save', {
          money: data.allmoney,
          swipe: data.wap_MerchantAd,
          total_earn: data.total_earn,
          total_fans: data.total_fans,
          total_order: data.total_order,
          total_visit: data.total_visit,
          total_visit_num: data.total_visit_num,
        })
      } else {
        reject()
      }
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
  // // echart进店人数
  // async getVisitsFaceEchartData(context, payload) {
  //   return new Promise(async (resolve, reject) => {
  //     const data = await homeAPI.getVisitsFaceEchartData(payload)
  //     data ? resolve(data) : reject()
  //   })
  // },
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
