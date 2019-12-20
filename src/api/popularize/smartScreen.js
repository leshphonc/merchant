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
  // 删除见面语
  deleteMeetGreeting: id =>
    axios.post('/appapi.php?c=Merchantimax&a=deleted_sea', {
      id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取屏幕下店员列表
  getStaffList: id =>
    axios.post('/appapi.php?c=Merchantimax&a=get_worker_list', {
      imax_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 推广海报列表
  getSmartScreenPosterList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=getAdList', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 切换海报发布状态
  changePosterRelease: id =>
    axios.post('/appapi.php?c=Merchantimax&a=on', {
      id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 切换海报启用禁用状态
  changePosterStatus: id =>
    axios.post('/appapi.php?c=Merchantimax&a=using', {
      id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建海报
  createPoster: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=savePushAd', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取海报详情
  getPosterDetail: id =>
    axios.post('/appapi.php?c=Merchantimax&a=site_features_detail', {
      id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改海报
  updatePoster: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=savePushAd', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取海报下推广角色
  getSmartScreenRoleList: () =>
    axios.post('/appapi.php?c=Merchantimax&a=getMerchantRoleList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 绑定海报到屏幕
  bindPosterToSmartScreen: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=adBindImax', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取海报下绑定的屏幕
  getSmartScreenInPoster: id =>
    axios.get('/appapi.php?c=Merchantimax&a=getAdBindImaxList', {
      params: {
        ad_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取智能屏销售列表
  getSmartScreenSalesRecord: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=...', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取商家店铺下上架且未推广的电商商品
  getNotPopularizedECommerceList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=spro', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取商家店铺下上架且未推广的团购商品
  getNotPopularizedGroupList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=...', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取商家店铺下上架且未推广的服务商品
  getNotPopularizedServiceList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=...', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取商家店铺下上架且未推广的套餐商品
  getNotPopularizedPackageList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=...', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
