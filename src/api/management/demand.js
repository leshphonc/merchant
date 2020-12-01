import axios from 'axios'

export default {
  // 获取列表
  getDemandList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=demandWithCommodityCategory', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}