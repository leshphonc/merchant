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
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 提现
  async withDraw(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.withDraw(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 充值记录
  async topupRecord(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.topupRecord(page)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 提现记录
  async withdrawRecord(context, { page = 1, type }) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.withdrawRecord(page, type)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 收支记录
  async incomeAndExpenditureRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.incomeAndExpenditureRecord(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取账户明细分类
  async getCategory() {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.getCategory()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建订单
  async createOrder(context, money) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.createOrder(money)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 检查订单
  async checkOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.checkOrder(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取支付参数
  async getPayInfo(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.getPayInfo(payload)
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
