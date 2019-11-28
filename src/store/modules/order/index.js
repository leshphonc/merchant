import orderAPI from '@/api/order/index'
import grourBuyActions from './groupBuy'
import reserveActions from './reserve'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取订单类别列表
  async getOrderTypeList() {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getOrderTypeList()
      data ? resolve(data) : reject()
    })
  },
  ...grourBuyActions,
  ...reserveActions,
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
