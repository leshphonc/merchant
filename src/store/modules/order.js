import orderAPI from '@/api/order'

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
  // 获取团购订单列表
  async getGroupList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getGroupList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 查询团购订单详情
  async readGroupOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.readGroupOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 将团购订单归属于店铺
  async ascriptionGroupOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.ascriptionGroupOrder(payload)
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
