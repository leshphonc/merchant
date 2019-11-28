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
  // 创建自提点
  async createSelfMentionPoint(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await selfMentionPointAPI.createSelfMentionPoint(payload)
      data ? resolve() : reject()
    })
  },
  // 修改自提点
  async updateSelfMentionPoint(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await selfMentionPointAPI.updateSelfMentionPoint(payload)
      data ? resolve() : reject()
    })
  },
  // 查询自提点详情
  async readSelfMentionPointDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await selfMentionPointAPI.readSelfMentionPointDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 删除自提点详情
  async delSelfMentionPoint(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await selfMentionPointAPI.delSelfMentionPoint(id)
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
