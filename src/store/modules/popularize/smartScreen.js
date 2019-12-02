import smartScreenAPI from '@/api/popularize/smartScreen'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取智能屏设备列表
  async getSmartScreenList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenList()
      data ? resolve(data) : reject()
    })
  },
  // 获取见面语列表
  async getMeetGreetingList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getMeetGreetingList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 创建顾客见面语
  async createMeetGreeting(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.createMeetGreeting(payload)
      data ? resolve() : reject()
    })
  },
  // 读取顾客见面语详情
  async getMeetGreetingDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getMeetGreetingDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改顾客见面语
  async updateMeetGreeting(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.updateMeetGreeting(payload)
      data ? resolve() : reject()
    })
  },
  // 读取屏幕下店员列表
  async getStaffList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getStaffList(id)
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
