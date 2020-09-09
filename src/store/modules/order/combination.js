import orderAPI from '@/api/order/index'

export default {
  // 获取服务订单列表
  async getCombinationCardList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getCombinationCardList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取服务订单详情
  async getCombinationCardOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getCombinationCardOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
}
