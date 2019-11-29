import takeAwayAPI from '@/api/order/index'

export default {
  // 获取外卖订单列表
  async getTakeAwayList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.getTakeAwayList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 查询外卖订单详情
  async readTakeAwayOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.readTakeAwayOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取外卖自提点列表
  async getTakeAwaySelfMentionPoinList(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.getTakeAwaySelfMentionPoinList(id)
      data ? resolve(data) : reject()
    })
  },
  // 分配外卖自提点
  async dispatchSelfMentionPoint(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.dispatchSelfMentionPoint(payload)
      data ? resolve() : reject()
    })
  },
  // 发货到自提点
  async sendGoodsToSelfMentionPoin(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.sendGoodsToSelfMentionPoin(id)
      data ? resolve() : reject()
    })
  },
  // 外卖接单
  async takeAwayOrders(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.takeAwayOrders(id)
      data ? resolve() : reject()
    })
  },
  // 外卖订单确认消费
  async takeAwayConfirmConsumption(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.takeAwayConfirmConsumption(id)
      data ? resolve() : reject()
    })
  },
  // 获取支持快递列表
  async getTakeAwayExpressList() {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.getTakeAwayExpressList()
      data ? resolve(data) : reject()
    })
  },
  // 确认发货
  async deliverGoods(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.deliverGoods(payload)
      data ? resolve() : reject()
    })
  },
  // 取消订单
  async cancelTakeAwayOrder(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await takeAwayAPI.cancelTakeAwayOrder(id)
      data ? resolve() : reject()
    })
  },
}
