import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取预定商品列表
  getReserveList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getReserveList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建预定商品
  createReserve(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createReserve(payload)
      data ? resolve() : reject()
    })
  },
  // 修改预定商品
  updateReserve(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateReserve(payload)
      data ? resolve() : reject()
    })
  },
  // 修改预定商品优惠
  updateReservePreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateReservePreferential(payload)
      data ? resolve() : reject()
    })
  },
  // 查询预定商品详情
  readReserveDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readReserveDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取平台预定商品分类
  getPlatformReserveCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformReserveCategoryList()
      data ? resolve(data) : reject()
    })
  },
}
