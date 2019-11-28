import axios from 'axios'

export default {
  // 读取团购商品列表
  getGroupBuyCommodityList: page =>
    axios.get('/appapi.php?c=Merchantapp&a=gpro', {
      params: {
        page,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 删除团购商品
  deleteGroupBuyCommodity: ({ store_id, goods_id }) =>
    axios.post('/appapi.php?c=SpaceMerchant&a=goods_del', {
      store_id,
      goods_id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取团购商品套餐列表
  getGroupBuyCommodityPackageList: () =>
    axios.get('/appapi.php?c=Merchantapp&a=group_packages', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 读取平台团购商品分类
  getPlatformGroupBuyCommodityCategoryList: () =>
    axios.get('/appapi.php?c=SpaceMerchant&a=goods_category', {
      params: {
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 创建团购商品套餐
  createGroupBuyCommodityPackage: payload => {
    return axios.post('/appapi.php?c=Merchantapp&a=add_mpackage', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 删除团购分类
  deleteGroupBuyCommodityCategory: ({ sort_id, type }) => {
    let method = 'delShopCate'
    if (type !== 1) {
      method = 'delShopTwo'
    }
    return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
      sort_id,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 创建团购商品
  createGroupBuyCommodity: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=add_group', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询团购商品详情
  readGroupBuyCommodityDetail: id =>
    axios.get('/appapi.php?c=Merchantapp&a=get_group_detail', {
      params: {
        group_id: id,
        ticket: localStorage.getItem('ticket'),
      },
    }),
  // 修改团购商品
  updateGroupBuyCommodity: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=edit_group', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改团购商品优惠
  updateGroupBuyCommodityPreferential: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=group_discount', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
