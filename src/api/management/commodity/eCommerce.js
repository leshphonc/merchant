import axios from 'axios'

export default {
  // 读取电商商品列表
  getECommerceList: page =>
    axios.get('/appapi.php?c=SpaceMerchant&a=spro', {
      params: {
        page,
        size: 10,
        good_type: 1,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 删除电商商品
  deleteECommerce: ({ store_id, goods_id }) =>
    axios.post('/appapi.php?c=SpaceMerchant&a=goods_del', {
      store_id,
      goods_id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取电商商品1级分类
  getECommerceFirstCategoryList: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=getShopCate', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 读取电商商品2级分类
  getECommerceSecondCategoryList: sort_id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getShopTwoCate', {
      sort_id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取平台电商商品分类
  getPlatformEcommerceCommodityCategoryList: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=goods_category', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建电商分类
  createECommerceCategory: ({ name, sort, is_week, week, discount, fid }) => {
    let method = 'addEditShopCate'
    if (fid !== '0') {
      method = 'addEditShopTwo'
    }
    return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
      fid,
      name,
      sort,
      is_week,
      week,
      discount,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 删除电商分类
  deleteECommerceCategory: ({ sort_id, type }) => {
    let method = 'delShopCate'
    if (type !== 1) {
      method = 'delShopTwo'
    }
    return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
      sort_id,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 创建电商商品
  createECommerce: payload =>
    axios.post(`/appapi.php?c=SpaceMerchant&a=goods_add`, {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询电商商品详情
  readECommerceDetail: id =>
    axios.get(`/appapi.php?c=SpaceMerchant&a=goods_detail`, {
      params: {
        goods_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 修改电商商品
  updateECommerce: payload =>
    axios.post(`/appapi.php?c=SpaceMerchant&a=goods_edit`, {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改电商商品优惠
  updateECommercePreferential: payload =>
    axios.post(`/appapi.php?c=SpaceMerchant&a=goods_discount`, {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
