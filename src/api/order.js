import axios from 'axios'

export default {
  // 订单类别列表
  getOrderTypeList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=order_list_all', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
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
}
