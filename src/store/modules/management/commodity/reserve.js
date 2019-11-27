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
  // 查询预定商品详情
  readReserveCommodityDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readReserveCommodityDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改预定商品
  updateReserveCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateReserveCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 删除预定商品
  deleteReserveCommodity(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteReserveCommodity(id)
      data ? resolve() : reject()
    })
  },
  // 读取预定内包含的服务项目
  readServiceOfReserveCommodity(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceOfReserveCommodity(id)
      data ? resolve(data) : reject()
    })
  },
  // 读取预定商品销售记录
  readReserveCommoditySalesRecord(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readReserveCommoditySalesRecord(id)
      data ? resolve(data) : reject()
    })
  },

  // 获取平台预定分类
  getPlatformReserveCommodityCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformReserveCommodityCategoryList()
      data ? resolve(data) : reject()
    })
  },
}
