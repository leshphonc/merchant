import axios from 'axios'

const { protocol } = window.location

let url = 'go.9youke.com/robot'
if (process.env.VUE_APP_ENV == 'prod') {
  url = 'go.91gzt.com/robot'
}

export default {
  // 获取机器人设备列表
  getSmartScreenList: id =>
    axios.get('/appapi.php?c=Merchantimax&a=setting', {
      params: {
        store_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取机器人布局
  getSmartScreenLayout: imax =>
    axios.get('/appapi.php?c=Merchantimax&a=getImaxLayout', {
      params: {
        imax_id: imax,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建机器人布局轮播图
  createCarousel: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=createImaxSite', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改机器人布局轮播图
  updateCarousel: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=updateImaxSite', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除机器人布局轮播图
  deleteCarousel: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=deleteImaxSite', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 机器人布局菜单选择   setImaxMenuIsSelected
  selectSmartScreenMenu: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=setAiMenu', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取抽奖活动列表
  getLotteryList: () =>
    axios.post('/appapi.php?c=Merchantimax&a=lotteryList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 机器人抽奖活动选择
  updateMenuLotteryUrl: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=updateImaxSiteLotteryLink', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取机器人机器人管理
  getSmartScreenDialogueRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=getTalkLogList', {
      params: {
        ...payload,
        size: 10,
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
    axios.post('/appapi.php?c=Merchantimax&a=get_ad_list', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 发布同城（旧）
  changePosterRelease: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=on', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 同城发布
  aroundPush: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=around_push', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 取消同城推广
  cancelAroundPush: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=cancel_around', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 切换海报启用禁用状态
  deletePoster: id =>
    axios.post('/appapi.php?c=Merchantimax&a=ad_delete', {
      id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建推广
  createPoster: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=save_ad', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改推广
  updatePoster: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=save_ad', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取海报详情
  getPosterDetail: id =>
    axios.post('/appapi.php?c=Merchantimax&a=getAdDetail', {
      id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取海报下推广角色
  getSmartScreenRoleList: () =>
    axios.post('/appapi.php?c=Merchantimax&a=getAiUserRolesList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取海报下推广会员
  getSmartScreenMemberList: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=card_group&page=1&size=50', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取海报下推广店员
  getSmartScreenStaffList: () =>
    axios.post('/appapi.php?c=Merchantimax&a=getMerchantRoleList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取海报下客人需求
  getSmartScreenDemandList: ids =>
    axios.post('/appapi.php?c=Merchantimax&a=getGuestDemandList', {
      imax_ids: ids,
      ticket: localStorage.getItem('ticket'),
    }),
  // 本店推荐
  localPush: payload =>
    // /appapi.php?c=Merchantimax&a=adBindImax
    axios.post('/appapi.php?c=Merchantimax&a=local_push', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 取消本店推荐
  cancelLocalPush: id =>
    axios.post('/appapi.php?c=Merchantimax&a=cancel_local', {
      id,
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
  // 获取机器人销售列表
  getSmartScreenSalesRecord: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=placeOrderList', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取商家店铺下上架且未推广的零售商品
  // getNotPopularizedECommerceList: payload =>
  //   axios.post('/appapi.php?c=SpaceMerchant&a=spro', {
  //     ...payload,
  //     size: 10,
  //     ticket: localStorage.getItem('ticket'),
  //   }),
  // // 获取商家店铺下上架且未推广的团购商品
  // getNotPopularizedGroupList: payload =>
  //   axios.post('/appapi.php?c=Merchantimax&a=...', {
  //     ...payload,
  //     ticket: localStorage.getItem('ticket'),
  //   }),
  // 获取商家店铺下上架且未推广的服务商品
  // getNotPopularizedServiceList: payload =>
  //   axios.post('/appapi.php?c=Merchantimax&a=...', {
  //     ...payload,
  //     ticket: localStorage.getItem('ticket'),
  //   }),
  // 获取商家店铺下上架且未推广的套餐商品
  // getNotPopularizedPackageList: payload =>
  //   axios.post('/appapi.php?c=Merchantimax&a=...', {
  //     ...payload,
  //     ticket: localStorage.getItem('ticket'),
  //   }),
  // 获取推广海报的分类和标签
  // getSmartScreenPosterTagAndCateList: payload =>
  //   axios.get('/appapi.php?c=Merchantimax&a=getAdCategoryList', {
  //     params: {
  //       ...payload,
  //       size: 10,
  //       ticket: localStorage.getItem('ticket'),
  //     },
  //   }),
  // 获取同城商家列表
  getSameCityMerchant: payload =>
    axios.post('/appapi.php?c=Merchant&a=getSameCityList', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 保存同城商家咨询
  saveSameCityAdvisory: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=setSameCityQuestionMer', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取绑定了屏幕的店铺列表(可传推广商品id)
  getStoreAndScreen: payload =>
    axios.post('/appapi.php?c=Tracking&a=deviceStoreList', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 筛选屏幕统计数据
  getPromotionStatistics: payload =>
    axios.post('/appapi.php?c=Tracking&a=spreadTracking', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取商家已勾选的联盟推广
  getSelectedUnion: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=selected_union', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取商家未勾选的联盟推广
  getUnSelectUnion: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=union_ad_list', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 选择联合推广
  selectUnion: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=add_union', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 取消联合推广
  unSelectUnion: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=delete_union', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改联合推广的屏幕
  selectUnionRobot: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=change_union_imax', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取所有需求列表（联合推广用）
  getAllNeedList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=union_guest_demand_list', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取已选需求列表（联合推广用）
  getSelectNeedList: payload =>
    axios.post('/appapi.php?c=Merchantimax&a=selected_union_guest_demand_list', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  getMap: imei =>
    axios.get(`${protocol}//${url}/workspace/${imei}`, {
      ticket: localStorage.getItem('ticket'),
    }),
  getMapMarkList: imei =>
    axios.get(`${protocol}//${url}/workspace/${imei}/marks`, {
      ticket: localStorage.getItem('ticket'),
    }),
  changeMapMarkStatus: payload =>
    axios.put(`${protocol}//${url}/workspace/${payload.imei}/marks/${payload.id}`, {
      status: payload.status,
      ticket: localStorage.getItem('ticket'),
    }),
}
