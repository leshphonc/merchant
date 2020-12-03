import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取服务商品列表
  getServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getServiceList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建服务商品
  createService(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createService(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询服务商品详情
  readServiceDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 删除服务商品
  deleteService(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteService(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改服务商品优惠
  updateServicePreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateServicePreferential(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取服务商品分类
  getServiceCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getServiceCategoryList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建服务商品分类
  createServiceCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createServiceCategory(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 删除服务商品分类
  deleteServiceCategory(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteServiceCategory(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取服务项目销售记录
  readServiceSalesRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceSalesRecord(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
