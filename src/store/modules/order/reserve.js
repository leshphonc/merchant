import reserveAPI from '@/api/order/index'

export default {
  // 获取预定订单列表
  async getReserveList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.getReserveList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 查询预定订单详情
  async readReserveOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.readReserveOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 预定服务指派服务者
  async dispatchReserveOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.dispatchReserveOrder(payload)
      data ? resolve() : reject()
    })
  },
  // 验证预定服务
  async verifyReserveOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.verifyReserveOrder(payload)
      data ? resolve() : reject()
    })
  },
}
