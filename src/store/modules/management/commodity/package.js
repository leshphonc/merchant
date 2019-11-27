import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取套餐商品列表
  getPackageCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPackageCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建套餐商品
  createPackageCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createPackageCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 查询套餐商品详情
  readPackageCommodityDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readPackageCommodityDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改套餐商品
  updatePackageCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updatePackageCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 删除套餐商品
  deletePackageCommodity(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deletePackageCommodity(id)
      data ? resolve() : reject()
    })
  },
  // 读取套餐内包含的服务项目
  readServiceOfPackageCommodity(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceOfPackageCommodity(id)
      data ? resolve(data) : reject()
    })
  },
  // 读取套餐商品销售记录
  readPackageCommoditySalesRecord(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readPackageCommoditySalesRecord(id)
      data ? resolve(data) : reject()
    })
  },
}
