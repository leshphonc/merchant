import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取套餐商品列表
  getPackageList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPackageList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建套餐商品
  createPackage(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createPackage(payload)
      data ? resolve() : reject()
    })
  },
  // 查询套餐商品详情
  readPackageDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readPackageDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改套餐商品
  updatePackage(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updatePackage(payload)
      data ? resolve() : reject()
    })
  },
  // 删除套餐商品
  deletePackage(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deletePackage(id)
      data ? resolve() : reject()
    })
  },
  // 修改套餐商品优惠
  updatePackagePreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updatePackagePreferential(payload)
      data ? resolve() : reject()
    })
  },
  // 读取套餐内包含的服务项目
  readServiceOfPackage(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceOfPackage(id)
      data ? resolve(data) : reject()
    })
  },
  // 读取套餐商品销售记录
  readPackageSalesRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readPackageSalesRecord(payload)
      data ? resolve(data) : reject()
    })
  },
}
