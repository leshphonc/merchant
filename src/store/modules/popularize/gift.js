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
  // 删除礼品
  async deleteGift(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await giftAPI.deleteGift(id)
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
