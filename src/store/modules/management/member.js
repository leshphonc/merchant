import commodityAPI from '@/api/management/member'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 获取在线访问用户列表
  async getAccessUserList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getAccessUserList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取在线访问用户的用户行为
  async getAccessUserBehaviorList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getAccessUserBehaviorList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取消费用户列表
  async getConsumeUserList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getConsumeUserList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取用户的消费记录
  async getUserConsumingRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getUserConsumingRecord(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取绑定粉丝列表
  async getBindingFansList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getBindingFansList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取绑定粉丝的用户行为
  async getBindingFansBehaviorList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getBindingFansBehaviorList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取领卡会员列表
  async getCollarCardMemberList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCollarCardMemberList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取会员分组列表
  async getMemberGroupList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getMemberGroupList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建会员卡分组
  async createMemberGroup(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createMemberGroup(payload)
      data ? resolve() : reject()
    })
  },
  // 查询会员卡分组
  async readMemberGroupDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readMemberGroupDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改会员卡分组
  async updateMemberGroup(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateMemberGroup(payload)
      data ? resolve() : reject()
    })
  },
  // 获取优惠券列表
  async getCouponList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponList(page)
      data ? resolve(data) : reject()
    })
  },
  // 优惠券状态变更
  async changeCouponStatus(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.changeCouponStatus(payload)
      data ? resolve() : reject()
    })
  },
  // 获取优惠券已领列表
  async getCouponReceivedList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponReceivedList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 优惠券核销
  async writeOffCoupon(context, code) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.writeOffCoupon(code)
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
