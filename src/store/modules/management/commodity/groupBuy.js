import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取团购商品列表
  async getGroupBuyCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getGroupBuyCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  // 删除团购商品
  async deleteGroupBuyCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteGroupBuyCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 读取团购商品套餐列表
  async getGroupBuyCommodityPackageList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getGroupBuyCommodityPackageList()
      data ? resolve(data) : reject()
    })
  },
  // 读取平台团购商品分类
  async getPlatformGroupBuyCommodityCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformGroupBuyCommodityCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 创建团购商品套餐
  async createGroupBuyCommodityPackage(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createGroupBuyCommodityPackage(payload)
      data ? resolve() : reject()
    })
  },
  // 删除团购分类
  async deleteGroupBuyCommodityCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteGroupBuyCommodityCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 创建团购商品
  async createGroupBuyCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createGroupBuyCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 查询团购商品详情
  async readGroupBuyCommodityDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readGroupBuyCommodityDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改团购商品
  async updateGroupBuyCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateGroupBuyCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 修改团购商品优惠
  async updateGroupBuyCommodityPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateGroupBuyCommodityPreferential(payload)
      data ? resolve() : reject()
    })
  },
}
