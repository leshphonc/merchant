import axios from 'axios'

export default {
  // 获取外卖订单列表
  getTakeAwayList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=shop_order', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 查询外卖订单详情
  readTakeAwayOrderDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=shop_order_detail', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取外卖自提点列表
  getTakeAwaySelfMentionPoinList: id =>
    axios.get('/appapi.php?c=Merchantapp&a=getPickAddress', {
      params: {
        order_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 分配外卖自提点
  dispatchSelfMentionPoint: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=pick', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 发货到自提点
  sendGoodsToSelfMentionPoin: id =>
    axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
      order_id: id,
      status: '8',
      ticket: localStorage.getItem('ticket'),
    }),
  // 外卖接单
  takeAwayOrders: id =>
    axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
      order_id: id,
      status: '1',
      ticket: localStorage.getItem('ticket'),
    }),
  // 外卖订单确认消费
  takeAwayConfirmConsumption: id =>
    axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
      order_id: id,
      status: '2',
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取支持快递列表
  getTakeAwayExpressList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=express_list', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 确认发货
  deliverGoods: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
      ...payload,
      status: '2',
      ticket: localStorage.getItem('ticket'),
    }),
  // 取消外卖订单
  cancelTakeAwayOrder: id =>
    axios.post('/appapi.php?c=Merchantapp&a=shopOrderEdit', {
      order_id: id,
      status: '5',
      ticket: localStorage.getItem('ticket'),
    }),
}
