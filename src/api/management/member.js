import axios from 'axios'

export default {
  // 获取在线访问用户列表
  getAccessUserList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=visit_list', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取在线访问用户的用户行为
  getAccessUserBehaviorList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=Customer_detail', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取消费用户列表
  getConsumeUserList: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=getMerPayUsers', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取用户的消费记录
  getUserConsumingRecord: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=getUserPayLog', {
      ...payload,
      size: 10,
      begin_time: '2018-1-1',
      end_time: '2030-1-11',
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取绑定粉丝列表
  getBindingFansList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=fans_list', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取绑定粉丝的用户行为
  getBindingFansBehaviorList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=Customer_detail', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取商家基础会员卡信息
  getBasicMemberCard: () =>
    axios.post('/appapi.php?c=MemberCard&a=showMemberCard', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改商家基础会员卡信息
  updateBasicMemberCard: payload =>
    axios.post('/appapi.php?c=MemberCard&a=editMerberCard', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改商家基础会员卡余额信息
  updateBasicMemberCardBalance: payload =>
    axios.post('/appapi.php?c=MemberCard&a=editMerberCardOther', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改商家基础会员卡微信配置
  updateBasicMemberCardInWX: payload =>
    axios.post('/appapi.php?c=MemberCard&a=editMerberCardWx', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取领卡会员列表
  getCollarCardMemberList: page =>
    axios.get('/appapi.php?c=Merchantapp&a=card_user_list', {
      params: {
        page,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建领卡会员
  createMemberCard: payload =>
    axios.post('/appapi.php?c=MemberCard&a=addMember', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询会员卡充值记录
  getMemberCardAddCreditRecord: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=rechargeList', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 会员分组列表
  getMemberGroupList: page => {
    let obj = {}
    let method = 'card_group_all'
    if (page) {
      method = 'card_group'
      obj = { page, size: 10 }
    }
    return axios.get(`/appapi.php?c=SpaceMerchant&a=${method}`, {
      params: {
        ...obj,
        ticket: localStorage.getItem('ticket'),
      },
    })
  },
  // 创建会员卡分组
  createMemberGroup: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_card_group', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询会员卡详情
  readMemberGroupDetail: id =>
    axios.post('/appapi.php?c=Merchantapp&a=card_group_detail', {
      gid: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改会员卡分组
  updateMemberGroup: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_card_group', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取优惠券列表
  getCouponList: page =>
    axios.get('/appapi.php?c=Merchantapp&a=card_new_coupon', {
      params: {
        page,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),

  // 创建优惠券
  createCoupon: payload =>
    axios.post('/appapi.php?c=Coupon&a=addCoupon', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 编辑优惠券
  updateCoupon: payload =>
    axios.post('/appapi.php?c=Coupon&a=couponEdit', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取优惠券详情
  getCouponDetail: id =>
    axios.post('/appapi.php?c=Coupon&a=couponDetail', {
      coupon_id: id,
      ticket: localStorage.getItem('ticket'),
    }),

  // 优惠券状态变更
  changeCouponStatus: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_coupon', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取优惠券已领列表
  getCouponReceivedList: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=card_new_coupon_handpull', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 优惠券核销
  writeOffCoupon: code =>
    axios.post('/appapi.php?c=Merchantapp&a=use_couponcode', {
      code,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取优惠券使用类别列表
  getCouponCategory: () =>
    axios.post('/appapi.php?c=Coupon&a=getCategoryList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取优惠券使用类别二级分类
  getCouponSecondCategory: type =>
    axios.post('/appapi.php?c=Coupon&a=getCateByCategory', {
      order_type: type,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取优惠券使用类别三级分类
  getCouponThirdCategory: payload =>
    axios.post('/appapi.php?c=Coupon&a=getGoodsCate', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取优惠券颜色列表
  getCouponColorList: () =>
    axios.post('/appapi.php?c=Coupon&a=getColorList', {
      ticket: localStorage.getItem('ticket'),
    }),
}
