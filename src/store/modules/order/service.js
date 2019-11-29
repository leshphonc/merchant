import orderAPI from '@/api/order/index'

export default {
  // 获取服务订单列表
  async getServiceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getServiceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取服务订单详情
  async getServiceOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getServiceOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
}
