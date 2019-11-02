import axios from 'axios'

export default {
  // 会员分组列表
  getMemberGroupList: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=card_group_all', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
