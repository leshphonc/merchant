import orderAPI from '@/api/order'

export default {
  // 获取团购订单列表
  async getGroupList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getGroupList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 查询团购订单详情
  async readGroupOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.readGroupOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 将团购订单归属于店铺
  async ascriptionGroupOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.ascriptionGroupOrder(payload)
      data ? resolve() : reject()
    })
  },
  // 修改团购订单快递单号信息
  async changeGroupOrderExpress(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.changeGroupOrderExpress(payload)
      data ? resolve() : reject()
    })
  },
  // 查询团购订单核销码列表
  async readGroupOrderWriteOff(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.readGroupOrderWriteOff(id)
      data ? resolve(data) : reject()
    })
  },
  // 团购单个核销
  async verifySingleGroupCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifySingleGroupCode(payload)
      data ? resolve() : reject()
    })
  },
  // 团购多个核销
  async verifyArrayGroupCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifyArrayGroupCode(payload)
      data ? resolve() : reject()
    })
  },
  // 团购全部核销
  async verifyAllGroupCode(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.verifyAllGroupCode(payload)
      data ? resolve() : reject()
    })
  },
}
