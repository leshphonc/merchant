import axios from 'axios'

export default {
  // 零售商品分销分佣修改
  updateECommerceReward: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=goods_spread', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 预定商品分销分佣修改
  updateReserveReward: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=appoint_spread', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 团购商品分销分佣修改
  updateGroupBuyReward: payload =>
    axios.post('/appapi.php?c=Merchantapp&a=group_spread', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 服务项目分销分佣修改
  updateServiceReward: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=service_spread', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
  // 套餐商品分销分佣修改
  updatePackageReward: payload =>
    axios.post('/appapi.php?c=SpaceMerchant&a=meal_spread', {
      ...payload,
      ticket: localStorage.getItem('ticket'),
    }),
}
