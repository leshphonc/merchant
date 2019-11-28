import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取预定商品列表
  getReserveCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getReserveCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建预定商品
  createReserveCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createReserveCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 修改预定商品
  updateReserveCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateReserveCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 修改预定商品优惠
  updateReserveCommodityPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateReserveCommodityPreferential(payload)
      data ? resolve() : reject()
    })
  },
  // 查询预定商品详情
  readReserveCommodityDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readReserveCommodityDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取平台预定商品分类
  getPlatformReserveCommodityCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformReserveCommodityCategoryList()
      data ? resolve(data) : reject()
    })
  },
}
