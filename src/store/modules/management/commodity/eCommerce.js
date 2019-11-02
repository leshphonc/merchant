import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取电商商品列表
  async getECommerceCommodityList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceCommodityList(page)
      data ? resolve(data) : reject()
    })
  },
  // 删除电商商品
  async deleteECommerceCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerceCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 读取电商商品1级分类
  async getECommerceCommodityFirstCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceCommodityFirstCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 读取电商商品2级分类
  async getECommerceCommoditySecondCategoryList(context, sort_id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceCommoditySecondCategoryList(sort_id)
      data ? resolve(data) : reject()
    })
  },
  // 读取平台电商商品分类
  async getPlatformEcommerceCommodityCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformEcommerceCommodityCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 创建电商分类
  async createECommerceCommodityCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createECommerceCommodityCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 删除电商分类
  async deleteECommerceCommodityCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerceCommodityCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 创建电商商品
  async createECommerceCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createECommerceCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 查询电商商品详情
  async readECommerceCommodityDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readECommerceCommodityDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改电商商品
  async updateECommerceCommodity(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateECommerceCommodity(payload)
      data ? resolve() : reject()
    })
  },
  // 修改电商商品优惠
  async updateECommerceCommodityPreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateECommerceCommodityPreferential(payload)
      data ? resolve() : reject()
    })
  },
}
