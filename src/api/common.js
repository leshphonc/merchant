import axios from 'axios'

export default {
  login: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=login', {
      ...payload,
    }),
}
