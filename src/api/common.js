import axios from 'axios'

export default {
  // 登录
  login: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=login', {
      ...payload,
    }),
  // 省份列表
  getProvince: () =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_province', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 城市列表
  getCity: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_city', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 地区列表
  getArea: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_area', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 商圈列表
  getCircle: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_circle', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 商盟列表
  getMarket: id =>
    axios.get('/appapi.php?c=Merchantapp&a=ajax_market', {
      params: {
        id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 优惠券列表
  getCouponList: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=select_card_coupon', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取微信配置信息
  getWxConfig: () =>
    axios.post('/appapi.php?c=Config&a=wx_config', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 商铺列表
  getStoreList: flag =>
    axios.get('/appapi.php?c=Merchantapp&a=get_store', {
      params: {
        show_all: flag,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取平台配置信息
  getPlatFormInfo: () =>
    axios.post('/appapi.php?c=Merchantapp&a=get_config', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取用户UID
  getMerchantDetail: id =>
    axios.post('/appapi.php?c=Merchant&a=getMerchantDetail', {
      mer_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取商家配置的别名
  getAlias: () =>
    axios.get('/appapi.php?c=Merchantapp&a=get_config_alias', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取商家分佣层级
  getUserLevel: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=user_level', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
