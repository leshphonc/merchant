import orderAPI from '@/api/order/index'

export default {
  // 获取团购订单列表
  async getGroupList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getGroupList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 查询团购订单详情
  async readGroupBuyOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.readGroupBuyOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 将团购订单归属于店铺
  async ascriptionGroupBuyOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.ascriptionGroupBuyOrder(payload)
      data ? resolve() : reject()
    })
  },
  // 修改团购订单快递单号信息
  async changeGroupBuyOrderExpress(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.changeGroupBuyOrderExpress(payload)
      data ? resolve() : reject()
    })
  },
  // 查询团购订单核销码列表
  async readGroupBuyOrderWriteOff(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.readGroupBuyOrderWriteOff(id)
      data ? resolve(data) : reject()
    })
  },
  // 团购单个核销
  async verifySingleGroupBuyCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifySingleGroupBuyCode(payload)
      data ? resolve() : reject()
    })
  },
  // 团购多个核销
  async verifyArrayGroupBuyCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifyArrayGroupBuyCode(payload)
      data ? resolve() : reject()
    })
  },
  // 团购全部核销
  async verifyAllGroupBuyCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifyAllGroupBuyCode(payload)
      data ? resolve() : reject()
    })
  },
}
