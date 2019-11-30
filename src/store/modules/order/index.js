import orderAPI from '@/api/order/index'
import grourBuyActions from './groupBuy'
import takeAwayActions from './takeAway'
import reserveActions from './reserve'
import serviceActions from './service'
import packageActions from './package'
import eCommerceActions from './eCommerce'
import arrivalActions from './arrival'

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
  //  获取外卖订单状态列表
  async getOrderStatusList() {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getOrderStatusList()
      data ? resolve(data) : reject()
    })
  },
  ...grourBuyActions,
  ...takeAwayActions,
  ...reserveActions,
  ...serviceActions,
  ...packageActions,
  ...eCommerceActions,
  ...arrivalActions,
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
