import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取服务商品列表
  async getServiceList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getServiceList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建服务商品
  async createService(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createService(payload)
      data ? resolve() : reject()
    })
  },
  // 查询服务商品详情
  async readServiceDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 删除服务商品
  async deleteService(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteService(id)
      data ? resolve() : reject()
    })
  },
  // 读取服务商品分类
  getServiceCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getServiceCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 创建服务商品分类
  createServiceCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createServiceCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 删除服务商品分类
  deleteServiceCategory(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteServiceCategory(id)
      data ? resolve() : reject()
    })
  },
  // 读取服务项目销售记录
  readServiceSalesRecord(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceSalesRecord(id)
      data ? resolve(data) : reject()
    })
  },
}
