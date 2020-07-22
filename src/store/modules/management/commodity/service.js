import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取服务商品列表
  getServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 创建服务商品
  createService(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createService(payload)
      data ? resolve() : reject()
    })
  },
  // 查询服务商品详情
  readServiceDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 删除服务商品
  deleteService(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteService(id)
      data ? resolve() : reject()
    })
  },
  // 修改服务商品优惠
  updateServicePreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateServicePreferential(payload)
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
  readServiceSalesRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceSalesRecord(payload)
      data ? resolve(data) : reject()
    })
  },
}
