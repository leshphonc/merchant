import takeAwayAPI from '@/api/order/index'

export default {
  // 获取外卖订单列表
  async getTakeAwayList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.getTakeAwayList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询外卖订单详情
  async readTakeAwayOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.readTakeAwayOrderDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取外卖自提点列表
  async getTakeAwaySelfMentionPoinList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.getTakeAwaySelfMentionPoinList(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 分配外卖自提点
  async dispatchSelfMentionPoint(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.dispatchSelfMentionPoint(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 发货到自提点
  async sendGoodsToSelfMentionPoin(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.sendGoodsToSelfMentionPoin(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 外卖接单
  async takeAwayOrders(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.takeAwayOrders(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 外卖订单确认消费
  async takeAwayConfirmConsumption(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.takeAwayConfirmConsumption(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取支持快递列表
  async getTakeAwayExpressList() {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.getTakeAwayExpressList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 确认发货
  async deliverGoods(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.deliverGoods(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 取消订单
  async cancelTakeAwayOrder(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.cancelTakeAwayOrder(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
