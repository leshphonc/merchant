import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取零售商品列表
  async getECommerceList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 删除零售商品
  async deleteECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerce(payload)
      data ? resolve() : reject()
    })
  },
  // 读取零售商品1级分类
  async getECommerceFirstCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceFirstCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 读取零售商品2级分类
  async getECommerceSecondCategoryList(context, sort_id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceSecondCategoryList(sort_id)
      data ? resolve(data) : reject()
    })
  },
  // 读取平台零售商品分类
  async getPlatformEcommerceCommodityCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getPlatformEcommerceCommodityCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 创建零售分类
  async createECommerceCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createECommerceCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 删除零售分类
  async deleteECommerceCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerceCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 创建零售商品
  async createECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createECommerce(payload)
      data ? resolve() : reject()
    })
  },
  // 查询零售商品详情
  async readECommerceDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readECommerceDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改零售商品
  async updateECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateECommerce(payload)
      data ? resolve() : reject()
    })
  },
  // 修改零售商品优惠
  async updateECommercePreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateECommercePreferential(payload)
      data ? resolve() : reject()
    })
  },
}
