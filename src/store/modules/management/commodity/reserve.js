import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取预定商品列表
  getReserveList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getReserveList(page)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建预定商品
  createReserve(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createReserve(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改预定商品
  updateReserve(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateReserve(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改预定商品优惠
  updateReservePreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateReservePreferential(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询预定商品详情
  readReserveDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readReserveDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取平台预定商品分类
  getPlatformReserveCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformReserveCategoryList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
