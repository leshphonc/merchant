import common from '@/api/common'

export default {
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
}
