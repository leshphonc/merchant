import reserveAPI from '@/api/order/index'

export default {
  // 获取预定订单列表
  async getReserveList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.getReserveList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询预定订单详情
  async readReserveOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.readReserveOrderDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 预定服务指派服务者
  async dispatchReserveOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.dispatchReserveOrder(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 验证预定服务
  async verifyReserveOrder(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.verifyReserveOrder(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
