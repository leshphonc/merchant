import axios from 'axios'

export default {
  // 读取套餐商品列表
  getPackageList: page =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      page,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建套餐商品
  createPackage: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=addMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询套餐商品
  readPackageDetail: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改套餐商品
  updatePackage: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=editMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除套餐商品
  deletePackage: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delMeal', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改套餐商品优惠
  updatePackagePreferential: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=meal_discount', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取套餐商品分类列表
  getPackageCategoryList: () =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealCategoryList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建套餐商品分类
  createPackageCategory: ({ cat_name, cat_fid }) => {
    return axios.post('/appapi.php?c=SpaceMerchant&a=createMealCategory', {
      name: cat_name,
      parent_id: cat_fid,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 删除套餐商品分类
  deletePackageCategory: ({ cat_id }) => {
    return axios.post('/appapi.php?c=SpaceMerchant&a=deleteMealCategory', {
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
    axios.get('/appapi.php?c=Merchantapp&a=service_card_lists', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
