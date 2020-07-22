import axios from 'axios'

export default {
  // 读取套餐商品列表
  getPackageList: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getPackageList', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建套餐商品
  createPackage: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=updatePackage', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询套餐商品
  readPackageDetail: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getPackageDetail', {
      id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改套餐商品
  updatePackage: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=updatePackage', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除套餐商品
  deletePackage: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=deletePackage', {
      id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改套餐商品优惠
  updatePackagePreferential: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=packageDiscount', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取套餐商品分类列表
  getPackageCategoryList: () =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getPackageCategoryList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建套餐商品分类
  createPackageCategory: ({ cat_name, cat_fid }) => {
    return axios.post('/appapi.php?c=SpaceMerchant&a=createPackageCategory', {
      name: cat_name,
      parent_id: cat_fid,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 删除套餐商品分类
  deletePackageCategory: ({ cat_id }) => {
    return axios.post('/appapi.php?c=SpaceMerchant&a=deletePackageCategory', {
      id: cat_id,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 读取套餐内包含的服务项目
  readServiceOfPackage: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealProList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取套餐商品销售记录
  readPackageSalesRecord: payload =>
    axios.get('/appapi.php?c=SpaceMerchant&a=packageSaleRecords', {
      params: {
        ...payload,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
