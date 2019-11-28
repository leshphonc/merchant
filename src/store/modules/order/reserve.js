import reserveAPI from '@/api/order/index'

export default {
  // 获取预定订单列表
  async getReserveList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await reserveAPI.getReserveList(payload)
      data ? resolve(data) : reject()
    })
  },
}
