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
      data ? resolve() : reject()
    })
  },
  // 预定商品分销分佣修改
  updateReserveReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateReserveReward(payload)
      data ? resolve() : reject()
    })
  },
  // 团购商品分销分佣修改
  updateGroupBuyReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateGroupBuyReward(payload)
      data ? resolve() : reject()
    })
  },
  // 服务项目分销分佣修改
  updateServiceReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateServiceReward(payload)
      data ? resolve() : reject()
    })
  },
  // 套餐商品分销分佣修改
  updatePackageReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updatePackageReward(payload)
      data ? resolve() : reject()
    })
  },
  // 组合卡分销分佣修改
  updateCombinationCardReward(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await rewardAPI.updateCombinationCardReward(payload)
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
