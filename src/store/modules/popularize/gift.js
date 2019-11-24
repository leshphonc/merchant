import giftAPI from '@/api/popularize/gift'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取礼品列表
  async getGiftList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.getGiftList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 创建礼品
  async createGift(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.createGift(payload)
      data ? resolve() : reject()
    })
  },
  // 读取礼品详情
  async readGiftDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.readGiftDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改礼品
  async updateGift(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.updateGift(payload)
      data ? resolve() : reject()
    })
  },
  // 删除礼品
  async deleteGift(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.deleteGift(id)
      data ? resolve() : reject()
    })
  },
  // 获取礼品分类
  async getGiftCategory(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.getGiftCategory(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取礼品订单列表
  async getGiftOrderList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.getGiftOrderList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取礼品订单详情
  async getGiftOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.getGiftOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取礼品订单核销码
  async getGiftWriteOffCode(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.getGiftWriteOffCode(id)
      data ? resolve(data) : reject()
    })
  },
  // 礼品订单核销
  async WriteOffGift(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.WriteOffGift(payload)
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
