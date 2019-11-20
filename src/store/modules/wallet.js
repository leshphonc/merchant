import walletAPI from '@/api/wallet'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 读取提现微信账户
  async getWxAccount() {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.getWxAccount()
      data ? resolve(data) : reject()
    })
  },
  // 提现
  async withDraw(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.withDraw(payload)
      data ? resolve(data) : reject()
    })
  },
  // 充值记录
  async topupRecord(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.topupRecord(page)
      data ? resolve(data) : reject()
    })
  },
  // 提现记录
  async withdrawRecord(context, { page = 1, type }) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.withdrawRecord(page, type)
      data ? resolve(data) : reject()
    })
  },
  // 收支记录
  async incomeAndExpenditureRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.incomeAndExpenditureRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取账户明细分类
  async getCategory() {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.getCategory()
      data ? resolve(data) : reject()
    })
  },
  // 创建订单
  async createOrder(context, money) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.createOrder(money)
      data ? resolve(data) : reject()
    })
  },
  // 检查订单
  async checkOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.checkOrder(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取支付参数
  async getPayInfo(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.getPayInfo(payload)
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
