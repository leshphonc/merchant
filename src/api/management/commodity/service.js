import axios from 'axios'

export default {
  // 读取服务商品列表
  getServiceList: page =>
    axios.post('/appapi.php?c=SpaceMerchant&a=selProList', {
      page,
      size: 10,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建服务商品
  createService: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=editAndAddPro', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询服务商品
  readServiceDetail: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=selPro', {
      app_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除服务商品
  deleteService: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delPro', {
      app_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取服务商品分类列表
  getServiceCategoryList: () =>
    axios.post('/appapi.php?c=SpaceMerchant&a=selCateList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建服务商品分类
  createServiceCategory: ({ cat_name, cat_fid }) => {
    let method = 'addEditAppCate'
    if (cat_fid !== '0') {
      method = 'addTwoCate'
      return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
        data: JSON.stringify([{ cat_name, cat_fid }]),
        ticket: localStorage.getItem('ticket'),
      })
    }
    return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
      cat_fid,
      cat_name,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 删除服务商品分类
  deleteServiceCategory: ({ cat_id, type }) => {
    let method = 'delAppCate'
    if (type !== 1) {
      method = 'delTwoCate'
    }
    return axios.post(`/appapi.php?c=SpaceMerchant&a=${method}`, {
      cat_id,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 读取服务项目销售记录
  readServiceSalesRecord: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=.........', {
      app_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
}
