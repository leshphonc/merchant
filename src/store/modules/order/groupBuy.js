import orderAPI from '@/api/order/index'

export default {
  // 获取团购订单列表
  async getGroupBuyList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getGroupBuyList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询团购订单详情
  async readGroupBuyOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.readGroupBuyOrderDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 将团购订单归属于店铺
  async ascriptionGroupBuyOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.ascriptionGroupBuyOrder(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改团购订单快递单号信息
  async changeGroupBuyOrderExpress(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.changeGroupBuyOrderExpress(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询团购订单核销码列表
  async readGroupBuyOrderWriteOff(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.readGroupBuyOrderWriteOff(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 团购单个核销
  async verifySingleGroupBuyCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifySingleGroupBuyCode(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 团购多个核销
  async verifyArrayGroupBuyCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifyArrayGroupBuyCode(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 团购全部核销
  async verifyAllGroupBuyCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifyAllGroupBuyCode(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
