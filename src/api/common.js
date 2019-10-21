import axios from 'axios'

export default {
  login: ({ account, pwd }) => {
    const formdata = new FormData()
    formdata.append('account', account)
    formdata.append('pwd', pwd)
    let param = new URLSearchParams(formdata)
    return axios.post('/appapi.php?c=Merchantapp&a=login', param)
  },
}
