import common from '@/api/common'

export default {
  login(context, payload) {
    return new Promise(resolve => {
      common.login(payload).then(data => {
        localStorage.setItem('ticket', data.ticket)
        localStorage.setItem('merchant_user', JSON.stringify(data.user))
        data && resolve()
      })
    })
  },
}
