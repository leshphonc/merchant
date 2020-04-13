import axios from 'axios'

export default {
  // 读取组合卡列表
  getCombinationCardList: page =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      page,
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建组合卡
  createCombinationCard: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=addMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 查询组合卡
  readCombinationCardDetail: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改组合卡
  updateCombinationCard: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=editMeal', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 删除组合卡
  deleteCombinationCard: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=delMeal', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 修改组合卡优惠
  updateCombinationCardPreferential: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=meal_discount', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取组合卡分类列表
  getCombinationCardCategoryList: () =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealCategoryList', {
      ticket: localStorage.getItem('ticket'),
    }),
  // 创建组合卡分类
  createCombinationCardCategory: ({ cat_name, cat_fid }) => {
    return axios.post('/appapi.php?c=SpaceMerchant&a=createMealCategory', {
      name: cat_name,
      parent_id: cat_fid,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 删除组合卡分类
  deleteCombinationCardCategory: ({ cat_id }) => {
    return axios.post('/appapi.php?c=SpaceMerchant&a=deleteMealCategory', {
      id: cat_id,
      ticket: localStorage.getItem('ticket'),
    })
  },
  // 读取组合卡内包含的服务项目
  readServiceOfCombinationCard: id =>
    axios.post('/appapi.php?c=SpaceMerchant&a=getMealProList', {
      meal_id: id,
      ticket: localStorage.getItem('ticket'),
    }),
  // 读取组合卡销售记录
  readCombinationCardSalesRecord: payload =>
    axios.get('/appapi.php?c=Merchantapp&a=service_card_lists', {
      params: {
        ...payload,
        size: 10,
        ticket: localStorage.getItem('ticket'),
      },
    }),
}
