import commodityAPI from '@/api/management/member'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 读取会员分组列表
  async getMemberGroupList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getMemberGroupList()
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
