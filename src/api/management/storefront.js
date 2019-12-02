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
  // 读取店铺下绑定的电商商品列表
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
    axios.post('/appapi.php?c=SpaceMerchant&a=getStoreBindMeal', {
      ...payload,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
}
