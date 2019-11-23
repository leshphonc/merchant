import axios from 'axios'

export default {
  // 扫码记录
  getGiftList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=giftpro', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 删除礼品
  deleteGift: id =>
    axios.post('/appapi.php?c=Merchantapp&a=del_gift', {
      gift_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
}
