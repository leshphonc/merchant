import freightAPI from '@/api/setting/freight'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 查询运费模版列表
  async getFreightTemPlateList() {
    return new Promise(async (resolve, reject) => {
      const data = await freightAPI.getFreightTemPlateList()
      data ? resolve(data) : reject()
    })
  },
  // 创建运费模版
  async createFreightTemPlate(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await freightAPI.createFreightTemPlate(payload)
      data ? resolve() : reject()
    })
  },
  // 修改运费模版
  async updateFreightTemPlate(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await freightAPI.updateFreightTemPlate(payload)
      data ? resolve() : reject()
    })
  },
  // 查询运费模版详情
  async readFreightTemPlateDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await freightAPI.readFreightTemPlateDetail(id)
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
