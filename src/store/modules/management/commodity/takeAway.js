import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取外卖商品列表
  async getTakeAwayList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getTakeAwayList(page)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建外卖商品
  async createTakeAway(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createTakeAway(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询外卖商品详情
  async readTakeAwayDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readTakeAwayDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改外卖商品
  async updateTakeAway(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateTakeAway(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 删除外卖商品
  async deleteTakeAway(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteTakeAway(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取外卖内包含的服务项目
  async readServiceOfTakeAway(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceOfTakeAway(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取外卖商品销售记录
  readTakeAwaySalesRecord(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readTakeAwaySalesRecord(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
