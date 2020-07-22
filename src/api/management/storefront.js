import axios from 'axios'

export default {
  // 店铺列表
  getStoreFrontList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=store_lists', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建店铺
  createStoreFront: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_store', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 店铺详情
  readStoreFrontDetail: id =>
    axios.post('/appapi.php?c=Merchantapp&a=store_details', {
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 编辑店铺
  updateStoreFront: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_store', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 平台店铺分类
  getPlatformStoreFrontCategory: () =>
    axios.post('/appapi.php?c=Merchantapp&a=get_all_category', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 店铺资质审核
  storeFroontQualificationAudit: payload =>
    axios.post('/appapi.php?c=Merchantapp&type=merchantstore&a=auth_edit', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺下绑定的零售商品列表
  getStoreFrontBindECommerceList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=selBindGoods', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺下绑定的服务商品列表
  getStoreFrontBindServiceList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getStoreBindPro', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺下绑定的套餐商品列表
  getStoreFrontBindPackageList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getStoreBindPackage', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺下绑定的组合卡列表
  getStoreFrontBindCombinationCardList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getStoreBindMeal', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺下未绑定的零售商品列表
  getStoreFrontUnBindECommerceList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=selNoBindOnlineGoods', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺下未绑定的服务商品列表
  getStoreFrontUnBindServiceList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getNoBindPro', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺下未绑定的套餐商品列表
  getStoreFrontUnBindPackageList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getNoBindPackage', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺下未绑定的套餐商品列表
  getStoreFrontUnBindCombinationCardList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getNoBindMeal', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 绑定零售商品到店铺下
  bindECommerceToStoreFront: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=onlineGoodsBindStore', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 绑定服务商品到店铺下
  bindServiceToStoreFront: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=storebindPro', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 绑定套餐商品到店铺下
  bindPackageToStoreFront: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=storeBindPackage', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 绑定组合卡到店铺下
  bindCombinationCardToStoreFront: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=storeBindMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 解绑店铺下的零售商品
  unBindECommerce: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=goodsDelBindStore', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 解绑店铺下的服务商品
  unBindService: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delBindPro', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 解绑店铺下的套餐商品
  unBindPackage: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delBindPackage', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 解绑店铺下的组合卡
  unBindCombinationCard: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delBindMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 将零售产品加入店铺首页推荐
  addECommerceToRecommend: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=recommendOnlineGoods', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 将服务产品加入店铺首页推荐
  addServiceToRecommend: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=recommendAppointGoods', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 将套餐产品加入店铺首页推荐
  addPackageToRecommend: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=recommendPackage', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 将组合卡加入店铺首页推荐
  addCombinationCardToRecommend: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=recommendMealGoods', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取店铺下的自定义标识位
  getStoreFrontFlagList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getNowStation', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建店铺下的自定义标识位
  createStoreFrontFlag: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=addStation', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改店铺下的自定义标识位
  updateStoreFrontFlag: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=addStation', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取店铺当前的标识位
  getStoreFrontCurrentFlag: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getStationFlag', {
      store_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改店铺的标识状态
  changeStoreFlagStatus: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=onOffStore', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取店铺业务配置详情
  getStoreFrontBusinessDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=shop_detail', {
      params: {
        store_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 获取店铺二维码
  getStoreFrontQRCode: id =>
    axios.get('/appapi.php?c=Merchantapp&type=merchantstore&a=see_qrcode', {
      params: {
        id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 店铺业务信息编辑
  updateStoreFrontBusinessDetail: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=shop_edit', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 店铺优惠列表获取
  getStoreFrontPreferentialList: id =>
    axios.get('/appapi.php?c=Merchantapp&a=discount', {
      params: {
        store_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建店铺优惠
  createStoreFrontPreferential: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_discount', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改店铺优惠
  updateStoreFrontPreferential: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_discount', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取店铺下产生绑定关系的零售商品
  getBindingCommodityList: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=goodsPromotionRelation', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取店铺下产生绑定关系的零售商品
  getBindingServiceList: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=servicePromotionRelation', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 零售商品绑定推荐服务
  commodityBindService: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=servicePromotionRelationEdit', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 服务商品绑定推荐零售
  serviceBindCommodity: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=goodsPromotionRelationEdit', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 获取店铺打卡列表
  getClockInList: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=clock_type_list', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
