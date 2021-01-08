import axios from 'axios'

export default {
  // 获取列表
  getDemandList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=demandWithCommodityCategory', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 需求绑定分类
  bindCategory: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=demandBindClass', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}