import smartScreenAPI from '@/api/popularize/smartScreen'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取智能屏设备列表
  getSmartScreenList() {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenList()
      data ? resolve(data) : reject()
    })
  },
  // 获取见面语列表
  getMeetGreetingList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getMeetGreetingList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 创建顾客见面语
  createMeetGreeting(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.createMeetGreeting(payload)
      data ? resolve() : reject()
    })
  },
  // 读取顾客见面语详情
  getMeetGreetingDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getMeetGreetingDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改顾客见面语
  updateMeetGreeting(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.updateMeetGreeting(payload)
      data ? resolve() : reject()
    })
  },
  // 读取屏幕下店员列表
  getStaffList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getStaffList(id)
      data ? resolve(data) : reject()
    })
  },
  // 推广海报列表
  getSmartScreenPosterList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getSmartScreenPosterList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 切换海报发布状态
  changePosterRelease(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.changePosterRelease(id)
      data ? resolve() : reject()
    })
  },
  // 切换海报启用禁用状态
  changePosterStatus(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.changePosterStatus(id)
      data ? resolve() : reject()
    })
  },
  // 创建海报
  createPoster(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.createPoster(payload)
      data ? resolve() : reject()
    })
  },
  // 获取海报详情
  getPosterDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.getPosterDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改海报
  updatePoster(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await smartScreenAPI.updatePoster(payload)
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
