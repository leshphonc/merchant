import orderAPI from '@/api/order/index'

export default {
  // 获取服务订单列表
  async getECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getECommerceList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 获取服务订单详情
  async getECommerceOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getECommerceOrderDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
