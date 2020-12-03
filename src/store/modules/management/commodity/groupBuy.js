import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取团购商品列表
  async getGroupBuyList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getGroupBuyList(page)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 删除团购商品
  async deleteGroupBuy(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteGroupBuy(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取团购商品套餐列表
  async getGroupBuyPackageList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getGroupBuyPackageList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取平台团购商品分类
  async getPlatformGroupBuyCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformGroupBuyCategoryList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建团购商品套餐
  async createGroupBuyPackage(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createGroupBuyPackage(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 删除团购分类
  async deleteGroupBuyCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteGroupBuyCategory(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建团购商品
  async createGroupBuy(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createGroupBuy(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询团购商品详情
  async readGroupBuyDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readGroupBuyDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改团购商品
  async updateGroupBuy(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateGroupBuy(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改团购商品优惠
  async updateGroupBuyPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateGroupBuyPreferential(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
