import axios from 'axios'

export default {
  // 获取智能屏设备列表
  getSmartScreenList: () =>
    axios.get('/appapi.php?c=Merchantimax&a=setting', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取见面语列表
  getMeetGreetingList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=sea_lists', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建顾客见面语
  createMeetGreeting: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=add_sea', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取顾客见面语详情
  getMeetGreetingDetail: id =>
    axios.post('/appapi.php?c=Merchantimax&a=get_sea', {
      id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改顾客见面语
  updateMeetGreeting: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=update_sea', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取屏幕下店员列表
  getStaffList: id =>
    axios.post('/appapi.php?c=Merchantimax&a=get_worker_list', {
      imax_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
}
