import basicInformationAPI from '@/api/setting/basicInformation'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 读取商户基本信息
  async readMerchantInfo() {
    return new Promise(async (resolve, reject) => {
      const data = await basicInformationAPI.readMerchantInfo()
      data ? resolve(data) : reject()
    })
  },
  // 基本信息编辑
  async updateMerchantInfo(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await basicInformationAPI.updateMerchantInfo(payload)
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
