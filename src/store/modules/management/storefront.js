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
      data ? resolve(data) : reject()
    })
  },
  // 创建店铺
  createStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 店铺详情
  readStoreFrontDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.readStoreFrontDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 编辑店铺
  updateStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 平台店铺分类
  getPlatformStoreFrontCategory() {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getPlatformStoreFrontCategory()
      data ? resolve(data) : reject()
    })
  },
  // 店铺资质审核
  storeFroontQualificationAudit(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.storeFroontQualificationAudit(payload)
      data ? resolve() : reject()
    })
  },
  // 读取店铺下绑定的零售商品列表
  getStoreFrontBindECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindECommerceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下绑定的服务商品列表
  getStoreFrontBindServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下绑定的套餐商品列表
  getStoreFrontBindPackageList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindPackageList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下绑定的套餐商品列表
  getStoreFrontBindCombinationCardList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBindCombinationCardList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下未绑定的零售商品列表
  getStoreFrontUnBindECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindECommerceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下未绑定的服务商品列表
  getStoreFrontUnBindServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下未绑定的套餐商品列表
  getStoreFrontUnBindPackageList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindPackageList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 读取店铺下未绑定的套餐商品列表
  getStoreFrontUnBindCombinationCardList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontUnBindCombinationCardList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 绑定零售商品到店铺下
  bindECommerceToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindECommerceToStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 绑定服务商品到店铺下
  bindServiceToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindServiceToStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 绑定套餐商品到店铺下
  bindPackageToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindPackageToStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 绑定套餐商品到店铺下
  bindCombinationCardToStoreFront(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.bindCombinationCardToStoreFront(payload)
      data ? resolve() : reject()
    })
  },
  // 解绑店铺下的零售商品
  unBindECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindECommerce(payload)
      data ? resolve() : reject()
    })
  },
  // 解绑店铺下的服务商品
  unBindService(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindService(payload)
      data ? resolve() : reject()
    })
  },
  // 解绑店铺下的套餐商品
  unBindPackage(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindPackage(payload)
      data ? resolve() : reject()
    })
  },
  // 解绑店铺下的套餐商品
  unBindCombinationCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.unBindCombinationCard(payload)
      data ? resolve() : reject()
    })
  },
  // 将零售产品加入店铺首页推荐
  addECommerceToRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.addECommerceToRecommend(payload)
      data ? resolve() : reject()
    })
  },
  // 将服务产品加入店铺首页推荐
  addServiceToRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.addServiceToRecommend(payload)
      data ? resolve() : reject()
    })
  },
  // 将产品加入店铺首页推荐
  addPackageToRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.addPackageToRecommend(payload)
      data ? resolve() : reject()
    })
  },
  // 将产品加入店铺首页推荐
  addCombinationCardToRecommend(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.addCombinationCardToRecommend(payload)
      data ? resolve() : reject()
    })
  },
  // 获取店铺下的自定义标识位
  getStoreFrontFlagList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontFlagList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 创建店铺下的自定义标识位
  createStoreFrontFlag(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFrontFlag(payload)
      data ? resolve() : reject()
    })
  },
  // 修改店铺下的自定义标识位
  updateStoreFrontFlag(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFrontFlag(payload)
      data ? resolve() : reject()
    })
  },
  // 获取店铺当前的标识位
  getStoreFrontCurrentFlag(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontCurrentFlag(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改店铺的标识状态
  changeStoreFlagStatus(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.changeStoreFlagStatus(payload)
      data ? resolve() : reject()
    })
  },
  // 读取店铺业务配置详情
  getStoreFrontBusinessDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontBusinessDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取店铺二维码
  getStoreFrontQRCode(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontQRCode(id)
      data ? resolve(data) : reject()
    })
  },
  // 店铺业务信息编辑
  updateStoreFrontBusinessDetail(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFrontBusinessDetail(payload)
      data ? resolve() : reject()
    })
  },
  // 店铺优惠列表获取
  getStoreFrontPreferentialList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getStoreFrontPreferentialList(id)
      data ? resolve(data) : reject()
    })
  },
  // 创建店铺优惠
  createStoreFrontPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.createStoreFrontPreferential(payload)
      data ? resolve() : reject()
    })
  },
  // 修改店铺优惠
  updateStoreFrontPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.updateStoreFrontPreferential(payload)
      data ? resolve() : reject()
    })
  },
  // 获取店铺下产生绑定关系的零售商品
  getBindingCommodityList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getBindingCommodityList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取店铺下产生绑定关系的服务项目
  getBindingServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getBindingServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 零售商品绑定推荐服务
  commodityBindService(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.commodityBindService(payload)
      data ? resolve(data) : reject()
    })
  },
  // 服务商品绑定推荐零售
  serviceBindCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.serviceBindCommodity(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取店铺打卡列表
  getClockInList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await storeFrontAPI.getClockInList(payload)
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
