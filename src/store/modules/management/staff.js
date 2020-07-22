import staffAPI from '@/api/management/staff'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 店员列表
  async getStaffList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.getStaffList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取店员全部权限
  async getAllStaffPermission(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.getAllStaffPermission(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取店员权限
  async getStaffPermission(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.getStaffPermission(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改店员权限
  async updateStaffPermission(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.updateStaffPermission(payload)
      data ? resolve() : reject()
    })
  },
  // 店员调岗
  async staffTransfer(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.staffTransfer(payload)
      data ? resolve() : reject()
    })
  },
  // 店员客服状态修改
  async staffKFStatusChange(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.staffKFStatusChange(payload)
      data ? resolve() : reject()
    })
  },
  // 店员状态修改
  async staffStatusChange(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.staffStatusChange(id)
      data ? resolve() : reject()
    })
  },
  // 获取店员类型
  async getStaffType() {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.getStaffType()
      data ? resolve(data) : reject()
    })
  },
  // 创建店员
  async createStaff(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.createStaff(payload)
      data ? resolve() : reject()
    })
  },
  // 修改店员
  async updateStaff(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.updateStaff(payload)
      data ? resolve() : reject()
    })
  },
  // 查询店员详情
  async readStaffDetail(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.readStaffDetail(payload)
      data ? resolve(data) : reject()
    })
  },
  // 店员到岗记录
  async staffArrivalRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.staffArrivalRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 店员开单记录
  async staffBillingRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.staffBillingRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 店员服务记录
  async staffServiceRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.staffServiceRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 店员销售记录
  async staffSalesRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.staffSalesRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 技师等级列表
  async getStaffLevelList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.getStaffLevelList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 创建或修改技师等级
  async modifyStaffLevel(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.modifyStaffLevel(payload)
      data ? resolve(data) : reject()
    })
  },
  // 删除技师等级
  async deleteStaffLevel(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.deleteStaffLevel(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取店铺和打卡类型
  async getStoreAndClockInType(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.getStoreAndClockInType(id)
      data ? resolve(data) : reject()
    })
  },
  // 查询岗位与岗位下等级
  getPostAndLevel(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await staffAPI.getPostAndLevel(payload)
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
