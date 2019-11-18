import redEnvelopeAPI from '@/api/popularize/redEnvelope'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取红包列表
  async getRedEnvelopeList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.getRedEnvelopeList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建红包
  async createRedEnvelope(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.createRedEnvelope(payload)
      data ? resolve(data) : reject()
    })
  },
  // 修改红包
  async updateRedEnvelope(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.updateRedEnvelope(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取单个红包详情
  async readRedEnvelopeDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.readRedEnvelopeDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 红包领取记录
  async getRedEnvelopeReceivingRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.getRedEnvelopeReceivingRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 红包发布
  async publicRedEnvelope(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.publicRedEnvelope(id)
      data ? resolve() : reject()
    })
  },
  // 红包删除
  async deleteRedEnvelope(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.deleteRedEnvelope(id)
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
