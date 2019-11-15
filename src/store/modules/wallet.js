import walletAPI from '@/api/wallet'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 读取提现微信账户
  async readWxAccount() {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.readWxAccount()
      data ? resolve(data) : reject()
    })
  },
  // 充值记录
  async topupRecord(context, page) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.topupRecord(page)
      data ? resolve(data) : reject()
    })
  },
  // 提现记录
  async withdrawRecord(context, page) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.withdrawRecord(page)
      data ? resolve(data) : reject()
    })
  },
  // 收支记录
  async incomeAndExpenditureRecord(context, page) {
    return new Promise(async (resolve, reject) => {
      const data = await walletAPI.incomeAndExpenditureRecord(page)
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
