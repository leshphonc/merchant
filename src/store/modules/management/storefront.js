import storeFrontAPI from '@/api/management/storefront'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 店铺列表
  async getStoreFrontList() {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontList()
      data ? resolve(data) : reject()
    })
  },
  // 创建店铺
  async createStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 店铺详情
  async readStoreFrontDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.readStoreFrontDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 编辑店铺
  async updateStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 平台店铺分类
  async getPlatformStoreFrontCategory() {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getPlatformStoreFrontCategory()
      data ? resolve(data) : reject()
    })
  },
  // 店铺资质审核
  async storeFroontQualificationAudit(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.storeFroontQualificationAudit(payload)
      data ? resolve() : reject()
    })
  },
  // 读取店铺下绑定的电商商品列表
  async getStoreFrontBindECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindECommerceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下绑定的服务商品列表
  async getStoreFrontBindServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下绑定的套餐商品列表
  async getStoreFrontBindPackageList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindPackageList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下未绑定的电商商品列表
  async getStoreFrontUnBindECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindECommerceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下未绑定的服务商品列表
  async getStoreFrontUnBindServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下未绑定的套餐商品列表
  async getStoreFrontUnBindPackageList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindPackageList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 绑定电商商品到店铺下
  async bindECommerceToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindECommerceToStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 绑定服务商品到店铺下
  async bindServiceToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindServiceToStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 绑定套餐商品到店铺下
  async bindPackageToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindPackageToStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 解绑店铺下的电商商品
  async unBindECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindECommerce(payload)
      data ? resolve() : reject()
    })
  },
  // 解绑店铺下的服务商品
  async unBindService(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindService(payload)
      data ? resolve() : reject()
    })
  },
  // 解绑店铺下的套餐商品
  async unBindPackage(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindPackage(payload)
      data ? resolve() : reject()
    })
  },
  // 获取店铺下的自定义标识位
  async getStoreFrontFlagList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontFlagList(id)
      data ? resolve(data) : reject()
    })
  },
  // 创建店铺下的自定义标识位
  async createStoreFrontFlag(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFrontFlag(payload)
      data ? resolve() : reject()
    })
  },
  // 修改店铺下的自定义标识位
  async updateStoreFrontFlag(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFrontFlag(payload)
      data ? resolve() : reject()
    })
  },
  // 获取店铺当前的标识位
  async getStoreFrontCurrentFlag(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontCurrentFlag(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改店铺的标识状态
  async changeStoreFlagStatus(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.changeStoreFlagStatus(payload)
      data ? resolve() : reject()
    })
  },
  // 读取店铺业务配置详情
  async getStoreFrontBusinessDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBusinessDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取店铺二维码
  async getStoreFrontQRCode(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontQRCode(id)
      data ? resolve(data) : reject()
    })
  },
  // 店铺业务信息编辑
  async updateStoreFrontBusinessDetail(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFrontBusinessDetail(payload)
      data ? resolve() : reject()
    })
  },
  // 店铺优惠列表获取
  async getStoreFrontPreferentialList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontPreferentialList(id)
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
