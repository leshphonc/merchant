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
  // 获取商家基础会员卡信息
  async getBasicMemberCard() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getBasicMemberCard()
      data ? resolve(data) : reject()
    })
  },
  // 修改商家基础会员卡信息
  async updateBasicMemberCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateBasicMemberCard(payload)
      data ? resolve() : reject()
    })
  },
  // 修改商家基础会员卡余额信息
  async updateBasicMemberCardBalance(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateBasicMemberCardBalance(payload)
      data ? resolve() : reject()
    })
  },
  // 修改商家基础会员卡微信配置
  async updateBasicMemberCardInWX(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateBasicMemberCardInWX(payload)
      data ? resolve() : reject()
    })
  },
  // 获取领卡会员列表
  async getCollarCardMemberList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCollarCardMemberList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 创建领卡会员
  async createMemberCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createMemberCard(payload)
      data ? resolve() : reject()
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
  // 查询会员卡充值记录
  async getMemberCardAddCreditRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getMemberCardAddCreditRecord(payload)
      data ? resolve(data) : reject()
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
  // 创建优惠券
  async createCoupon(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createCoupon(payload)
      data ? resolve() : reject()
    })
  },
  // 修改优惠券
  async updateCoupon(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateCoupon(payload)
      data ? resolve() : reject()
    })
  },
  // 获取优惠券详情
  async getCouponDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponDetail(id)
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
  // 获取优惠券使用类别列表
  async getCouponCategory() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponCategory()
      data ? resolve(data) : reject()
    })
  },
  // 获取优惠券使用类别二级分类
  async getCouponSecondCategory(context, type) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponSecondCategory(type)
      data ? resolve(data) : reject()
    })
  },
  // 获取优惠券使用类别三级分类
  async getCouponThirdCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponThirdCategory(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取优惠券颜色列表
  async getCouponColorList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponColorList()
      data ? resolve(data) : reject()
    })
  },
  // 获取优惠券分组派发的分组列表
  async getCoupoonGroupList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCoupoonGroupList()
      data ? resolve(data) : reject()
    })
  },
  // 根据分组查询可分配的优惠券
  async getCouponInMemberGroup(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponInMemberGroup(id)
      data ? resolve(data) : reject()
    })
  },
  // 分组派发优惠券
  async distributeGroupCoupon(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.distributeGroupCoupon(payload)
      data ? resolve() : reject()
    })
  },
  // 查询个人派发用户
  async searchUserList(context, keyword) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.searchUserList(keyword)
      data ? resolve(data) : reject()
    })
  },
  // 派发个人优惠券
  async distributeSinglePersonCoupon(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.distributeSinglePersonCoupon(payload)
      data ? resolve() : reject()
    })
  },
  // 获取全部派发分组
  async getAllCouponGroup() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getAllCouponGroup()
      data ? resolve(data) : reject()
    })
  },
  // 优惠券派发记录
  async getCouponDistributeRecord(context, page) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCouponDistributeRecord(page)
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
