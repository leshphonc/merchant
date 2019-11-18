import selfMentionPointAPI from '@/api/setting/selfMentionPoint'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 查询自提点列表
  async getSelfMentionPointList() {
    return new Promise(async (resolve, reject) => {
      const data = await selfMentionPointAPI.getSelfMentionPointList()
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
