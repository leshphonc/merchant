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
