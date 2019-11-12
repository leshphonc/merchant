import axios from 'axios'

export default {
  // 团购订单列表
  getGroupList: ({ page, status, find_type, keyword, group_id }) =>
    axios.get('/appapi.php?c=Merchantapp&a=group_order', {
      params: {
        page,
        size: 10,
        status,
        find_type,
        keyword,
        group_id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 读取团购订单详情
  readGroupOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=group_order_detail', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 将团购订单归属于店铺
  ascriptionGroupOrder: ({ order_id, store_id }) =>
    axios.get('/appapi.php?c=Merchantapp&a=order_store_id', {
      params: {
        order_id,
        store_id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 修改团购订单快递单号信息
  changeGroupOrderExpress: ({ express_type, express_id, order_id, store_id }) =>
    axios.post('/appapi.php?c=Merchantapp&a=group_express', {
      express_type,
      express_id,
      order_id,
      store_id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询团购订单核销码列表
  readGroupOrderWriteOff: order_id =>
    axios.post('/appapi.php?c=Merchantapp&a=group_pass_array', {
      order_id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 团购单个核销
  verifySingleGroupCode: ({ order_id, group_pass }) =>
    axios.post('/appapi.php?c=Merchantapp&a=group_verify', {
      order_id,
      group_pass,
      ticket: localStorage.getItem('ticket'),
    }),
  // 团购多个核销
  verifyArrayGroupCode: ({ order_id, group_pass }) =>
    axios.post('/appapi.php?c=Merchantapp&a=group_array_verify', {
      order_id,
      group_pass,
      ticket: localStorage.getItem('ticket'),
    }),
  // 团购全部核销
  verifyAllGroupCode: ({ order_id, store_id }) =>
    axios.post('/appapi.php?c=Merchantapp&a=group_verify', {
      order_id,
      store_id,
      ticket: localStorage.getItem('ticket'),
    }),
}
