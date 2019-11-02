import common from '@/api/common'

export default {
  // 登录
  login(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await common.login(payload)
      if (data) {
        localStorage.setItem('ticket', data.ticket)
        localStorage.setItem('merchant_user', JSON.stringify(data.user))
        resolve()
      } else {
        reject()
      }
    })
  },
  // 优惠券列表
  getCouponList() {
    return new Promise(async (resolve, reject) => {
      const data = await common.getCouponList()
      data ? resolve(data) : reject()
    })
  },
}
