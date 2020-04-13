import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取组合卡列表
  getCombinationCardList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCombinationCardList(page)
      data ? resolve(data) : reject()
    })
  },
  // 创建组合卡
  createCombinationCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createCombinationCard(payload)
      data ? resolve() : reject()
    })
  },
  // 查询组合卡详情
  readCombinationCardDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readCombinationCardDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改组合卡
  updateCombinationCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateCombinationCard(payload)
      data ? resolve() : reject()
    })
  },
  // 删除组合卡
  deleteCombinationCard(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteCombinationCard(id)
      data ? resolve() : reject()
    })
  },
  // 修改组合卡优惠
  updateCombinationCardPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateCombinationCardPreferential(payload)
      data ? resolve() : reject()
    })
  },
  // 读取组合卡分类
  getCombinationCardCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCombinationCardCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 创建组合卡分类
  createCombinationCardCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createCombinationCardCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 删除组合卡分类
  deleteCombinationCardCategory(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteCombinationCardCategory(id)
      data ? resolve() : reject()
    })
  },
  // 读取组合卡内包含的服务项目
  readServiceOfCombinationCard(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceOfCombinationCard(id)
      data ? resolve(data) : reject()
    })
  },
  // 读取组合卡销售记录
  readCombinationCardSalesRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readCombinationCardSalesRecord(payload)
      data ? resolve(data) : reject()
    })
  },
}
