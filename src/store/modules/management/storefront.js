import storeFrontAPI from '@/api/management/storefront'

// initial state
const state = {}

// getters
const getters = {}

// actions
const actions = {
  // 店铺列表
  getStoreFrontList() {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建店铺
  createStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFront(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 店铺详情
  readStoreFrontDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.readStoreFrontDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 编辑店铺
  updateStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFront(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 平台店铺分类
  getPlatformStoreFrontCategory() {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getPlatformStoreFrontCategory()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 店铺资质审核
  storeFroontQualificationAudit(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.storeFroontQualificationAudit(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺下绑定的零售商品列表
  getStoreFrontBindECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindECommerceList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺下绑定的服务商品列表
  getStoreFrontBindServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindServiceList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺下绑定的套餐商品列表
  getStoreFrontBindPackageList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindPackageList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺下绑定的套餐商品列表
  getStoreFrontBindCombinationCardList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindCombinationCardList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺下未绑定的零售商品列表
  getStoreFrontUnBindECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindECommerceList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺下未绑定的服务商品列表
  getStoreFrontUnBindServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindServiceList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺下未绑定的套餐商品列表
  getStoreFrontUnBindPackageList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindPackageList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺下未绑定的套餐商品列表
  getStoreFrontUnBindCombinationCardList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindCombinationCardList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 绑定零售商品到店铺下
  bindECommerceToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindECommerceToStoreFront(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 绑定服务商品到店铺下
  bindServiceToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindServiceToStoreFront(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 绑定套餐商品到店铺下
  bindPackageToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindPackageToStoreFront(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 绑定套餐商品到店铺下
  bindCombinationCardToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindCombinationCardToStoreFront(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 解绑店铺下的零售商品
  unBindECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindECommerce(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 解绑店铺下的服务商品
  unBindService(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindService(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 解绑店铺下的套餐商品
  unBindPackage(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindPackage(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 解绑店铺下的套餐商品
  unBindCombinationCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindCombinationCard(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 将零售产品加入店铺首页推荐
  addECommerceToRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.addECommerceToRecommend(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 将服务产品加入店铺首页推荐
  addServiceToRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.addServiceToRecommend(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 将产品加入店铺首页推荐
  addPackageToRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.addPackageToRecommend(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 将产品加入店铺首页推荐
  addCombinationCardToRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.addCombinationCardToRecommend(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取店铺下的自定义标识位
  getStoreFrontFlagList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontFlagList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建店铺下的自定义标识位
  createStoreFrontFlag(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFrontFlag(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改店铺下的自定义标识位
  updateStoreFrontFlag(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFrontFlag(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取店铺当前的标识位
  getStoreFrontCurrentFlag(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontCurrentFlag(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改店铺的标识状态
  changeStoreFlagStatus(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.changeStoreFlagStatus(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取店铺业务配置详情
  getStoreFrontBusinessDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBusinessDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取店铺二维码
  getStoreFrontQRCode(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontQRCode(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 店铺业务信息编辑
  updateStoreFrontBusinessDetail(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFrontBusinessDetail(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 店铺优惠列表获取
  getStoreFrontPreferentialList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontPreferentialList(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建店铺优惠
  createStoreFrontPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFrontPreferential(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改店铺优惠
  updateStoreFrontPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFrontPreferential(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取店铺下产生绑定关系的零售商品（旧）
  getBindingCommodityList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getBindingCommodityList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取店铺下产生绑定关系的服务项目（旧）
  getBindingServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getBindingServiceList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询绑定关系
  getBindRelation(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getBindRelation(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 零售商品绑定推荐服务（旧）
  commodityBindService(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.commodityBindService(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 服务商品绑定推荐零售（旧）
  serviceBindCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.serviceBindCommodity(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 绑定商品
  bindRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindRecommend(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取店铺打卡列表
  getClockInList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getClockInList(payload)
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
