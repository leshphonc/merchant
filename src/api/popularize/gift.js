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
  // 创建礼品
  createGift: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_gift', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取礼品详情
  readGiftDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=get_gift_detail', {
      params: {
        gift_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 修改礼品
  updateGift: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_gift', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除礼品
  deleteGift: id =>
    axios.post('/appapi.php?c=Merchantapp&a=del_gift', {
      gift_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取礼品分类
  getGiftCategory: id =>
    axios.post('/appapi.php?c=Merchantapp&a=gift_category', {
      cat_fid: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取礼品订单列表
  getGiftOrderList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=gift_order', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取礼品订单详情
  getGiftOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=gift_order_detail', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取礼品订单核销码
  getGiftWriteOffCode: id =>
    axios.post('/appapi.php?c=Merchantapp&a=gift_pass_array', {
      order_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 礼品订单核销
  WriteOffGift: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=gift_array_verify', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
