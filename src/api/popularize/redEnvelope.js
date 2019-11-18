import axios from 'axios'

export default {
  // 扫码记录
  getRedEnvelopeList: page =>
    axios.get('/appapi.php?c=Merchantapp&a=red_packet', {
      params: {
        page,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建红包
  createRedEnvelope: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_red_packet', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改红包
  updateRedEnvelope: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_red_packet', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取单个红包详情
  readRedEnvelopeDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=get_red_packet', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 红包领取记录
  getRedEnvelopeReceivingRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=prize_log', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 红包发布
  publicRedEnvelope: id =>
    axios.post('/appapi.php?c=Merchantapp&a=fabu', {
      id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 红包删除
  deleteRedEnvelope: id =>
    axios.post('/appapi.php?c=Merchantapp&a=red_packet_del', {
      id,
      ticket: localStorage.getItem('ticket'),
    }),
}
