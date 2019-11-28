import commodityAPI from '@/api/management/commodity/index'

export default {
  // 读取电商商品列表
  async getECommerceList(context, page = 1) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceList(page)
      data ? resolve(data) : reject()
    })
  },
  // 删除电商商品
  async deleteECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerce(payload)
      data ? resolve() : reject()
    })
  },
  // 读取电商商品1级分类
  async getECommerceFirstCategoryList() {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceFirstCategoryList()
      data ? resolve(data) : reject()
    })
  },
  // 读取电商商品2级分类
  async getECommerceSecondCategoryList(context, sort_id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.getECommerceSecondCategoryList(sort_id)
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
  async createECommerceCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createECommerceCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 删除电商分类
  async deleteECommerceCategory(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.deleteECommerceCategory(payload)
      data ? resolve() : reject()
    })
  },
  // 创建电商商品
  async createECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.createECommerce(payload)
      data ? resolve() : reject()
    })
  },
  // 查询电商商品详情
  async readECommerceDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.readECommerceDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 修改电商商品
  async updateECommerce(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateECommerce(payload)
      data ? resolve() : reject()
    })
  },
  // 修改电商商品优惠
  async updateECommercePreferential(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await commodityAPI.updateECommercePreferential(payload)
      data ? resolve() : reject()
    })
  },
}
