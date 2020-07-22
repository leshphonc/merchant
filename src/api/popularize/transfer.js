import axios from 'axios'

export default {
  // 查询可以过户的组合卡列表
  getCombinationCardList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=service_card_give_lists', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 组合卡过户操作
  transferCombinationCard: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=give_card', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
