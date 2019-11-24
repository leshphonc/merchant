import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取外卖商品列表
  async getTakeAwayCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getTakeAwayCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建外卖商品
  async createTakeAwayCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createTakeAwayCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 查询外卖商品详情
  async readTakeAwayCommodityDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readTakeAwayCommodityDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改外卖商品
  async updateTakeAwayCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateTakeAwayCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 删除外卖商品
  async deleteTakeAwayCommodity(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteTakeAwayCommodity(id)
      data ? resolve() : reject()
    })
  },
  // 读取外卖内包含的服务项目
  async readServiceOfTakeAwayCommodity(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceOfTakeAwayCommodity(id)
      data ? resolve(data) : reject()
    })
  },
  // 读取外卖商品销售记录
  readTakeAwayCommoditySalesRecord(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readTakeAwayCommoditySalesRecord(id)
      data ? resolve(data) : reject()
    })
  },
}
