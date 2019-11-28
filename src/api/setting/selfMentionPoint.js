import axios from 'axios'

export default {
  // 查询自提点列表
  getSelfMentionPointList: page =>
    axios.get('/appapi.php?c=Merchantapp&a=pick_lists', {
      params: {
        page,
        size: 8,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建自提点
  createSelfMentionPoint: param =>
    axios.post('/appapi.php?c=Merchantapp&a=pick_address_add', {
      ...param,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改自提点
  updateSelfMentionPoint: param =>
    axios.post('/appapi.php?c=Merchantapp&a=pick_address_edit', {
      ...param,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询自提点详情
  readSelfMentionPointDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=pick_address_detail', {
      params: {
        id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 删除自提点
  delSelfMentionPoint: id =>
    axios.get('/appapi.php?c=Merchantapp&a=pick_address_del', {
      params: {
        id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
