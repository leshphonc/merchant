import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取组合卡列表
  getCombinationCardList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCombinationCardList(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建组合卡
  createCombinationCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createCombinationCard(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 查询组合卡详情
  readCombinationCardDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readCombinationCardDetail(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改组合卡
  updateCombinationCard(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateCombinationCard(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 删除组合卡
  deleteCombinationCard(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteCombinationCard(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 修改组合卡优惠
  updateCombinationCardPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateCombinationCardPreferential(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取组合卡分类
  getCombinationCardCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getCombinationCardCategoryList()
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 创建组合卡分类
  createCombinationCardCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createCombinationCardCategory(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 删除组合卡分类
  deleteCombinationCardCategory(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteCombinationCardCategory(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取组合卡内包含的服务项目
  readServiceOfCombinationCard(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readServiceOfCombinationCard(id)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
  // 读取组合卡销售记录
  readCombinationCardSalesRecord(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readCombinationCardSalesRecord(payload)
      typeof data  != "string" ? resolve(data) : reject(data)
    })
  },
}
