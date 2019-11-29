import orderAPI from '@/api/order/index'

export default {
  // 获取服务订单列表
  async getPackageList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getPackageList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取服务订单详情
  async getPackageOrderDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await orderAPI.getPackageOrderDetail(id)
      data ? resolve(data) : reject()
    })
  },
}
