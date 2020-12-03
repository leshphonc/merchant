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
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建红包
  async createRedEnvelope(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.createRedEnvelope(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改红包
  async updateRedEnvelope(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.updateRedEnvelope(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取单个红包详情
  async readRedEnvelopeDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.readRedEnvelopeDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 红包领取记录
  async getRedEnvelopeReceivingRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.getRedEnvelopeReceivingRecord(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 红包发布
  async publicRedEnvelope(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.publicRedEnvelope(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 红包删除
  async deleteRedEnvelope(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await redEnvelopeAPI.deleteRedEnvelope(id)
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
