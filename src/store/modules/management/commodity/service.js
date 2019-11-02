import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取服务商品列表
  async getServiceCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getServiceCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建服务商品
  async createServiceCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createServiceCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 查询服务商品详情
  async readServiceCommodityDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceCommodityDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 删除服务商品
  async deleteServiceCommodity(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteServiceCommodity(id)
      data ? resolve() : reject()
    })
  },
  // 读取服务商品分类
  getServiceCommodityCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getServiceCommodityCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 创建服务商品分类
  createServiceCommodityCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createServiceCommodityCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 删除服务商品分类
  deleteServiceCommodityCategory(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteServiceCommodityCategory(id)
      data ? resolve() : reject()
    })
  },
  // 读取服务项目销售记录
  readServiceCommoditySalesRecord(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceCommoditySalesRecord(id)
      data ? resolve(data) : reject()
    })
  },
}
