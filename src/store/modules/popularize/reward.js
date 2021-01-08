import rewardAPI from '@/api/popularize/reward'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 零售商品分销分佣修改
  async updateECommerceReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateECommerceReward(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 预定商品分销分佣修改
  updateReserveReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateReserveReward(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 团购商品分销分佣修改
  updateGroupBuyReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateGroupBuyReward(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 服务项目分销分佣修改
  updateServiceReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateServiceReward(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 套餐商品分销分佣修改
  updatePackageReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updatePackageReward(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 组合卡分销分佣修改
  updateCombinationCardReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateCombinationCardReward(payload)
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
