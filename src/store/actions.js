import common from '@/api/common'

export default {
  // 登录
  login(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await common.login(payload)
      if (data) {
        localStorage.setItem('ticket', data.ticket)
        localStorage.setItem('merchant_user', JSON.stringify(data.user))
        resolve()
      } else {
        reject()
      }
    })
  },
  // 省份列表
  getProvince(context, { shift }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getProvince()
      if (data) {
        if (shift && data.length > 1) {
          data.shift()
          resolve(data)
        } else {
          resolve(data)
        }
      } else {
        reject()
      }
    })
  },
  // 城市列表
  getCity(context, { id, shift }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getCity(id)
      if (data) {
        if (shift && data.length > 1) {
          data.shift()
          resolve(data)
        } else {
          resolve(data)
        }
      } else {
        reject()
      }
    })
  },
  // 地区列表
  getArea(context, { id, shift }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getArea(id)
      if (data) {
        if (shift && data.length > 1) {
          data.shift()
          resolve(data)
        } else {
          resolve(data)
        }
      } else {
        reject()
      }
    })
  },
  // 商圈列表
  getCircle(context, { id, shift }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getCircle(id)
      if (data) {
        if (shift && data.length > 1) {
          data.shift()
          resolve(data)
        } else {
          resolve(data)
        }
      } else {
        reject()
      }
    })
  },
  // 商盟列表
  getMarket(context, { id, shift }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getMarket(id)
      if (data) {
        if (shift && data.length > 1) {
          data.shift()
          resolve(data)
        } else {
          resolve(data)
        }
      } else {
        reject()
      }
    })
  },
  // 查询详情地址
  getAllAddressColumnsForPicker({ dispatch }, { province, city, area, circle, market }) {
    return new Promise(async resolve => {
      const result = {}
      // 查询所有省份
      const provinceData = await dispatch('getProvince', { shift: true })
      // 找出当前省份
      const provinceItem = provinceData.find(item => item.value === province)
      const provinceIndex = provinceData.findIndex(item => item.value === province)
      // 查询出省份下的城市
      const cityData = await dispatch('getCity', { id: province, shift: true })
      provinceItem.children = cityData
      // 找出当前城市
      const cityItem = cityData.find(item => item.value === city)
      const cityIndex = cityData.findIndex(item => item.value === city)

      // 查询城市下的地区
      const areaData = await dispatch('getArea', { id: city, shift: true })
      const areaIndex = areaData.findIndex(item => item.value === area)
      cityItem.children = areaData
      // 地区级联columns
      result.area = [
        { values: provinceData, defaultIndex: provinceIndex },
        { values: cityData, defaultIndex: cityIndex },
        { values: areaData, defaultIndex: areaIndex },
      ]
      if (!circle || circle === '0') {
        resolve(result)
        return false
      }

      // 查询地区下的商圈
      const circleData = await dispatch('getCircle', { id: area, shift: true })
      if (!circleData) {
        resolve(result)
        return false
      }
      // 商圈columns
      result.circle = circleData

      if (!market || market === '0') {
        resolve(result)
        return false
      }
      // 查询商圈下的商盟
      const marketData = await dispatch('getMarket', { id: circle, shift: true })
      if (!marketData) {
        resolve(result)
        return false
      }
      // 商盟columns
      result.market = marketData
      resolve(result)
    })
  },
  // 查询默认地址级联数据
  getDefaultAddressColumnsForPicker({ dispatch }) {
    return new Promise(async resolve => {
      const arr = []
      // 查询所有省份
      const provinceData = await dispatch('getProvince', { shift: true })
      arr.push({ values: provinceData })
      // 查询出省份下的城市
      const cityData = await dispatch('getCity', { id: provinceData[0].value, shift: true })
      provinceData[0].children = cityData
      arr.push({ values: cityData })
      // 查询城市下的地区
      const areaData = await dispatch('getArea', { id: cityData[0].value, shift: true })
      cityData[0].children = areaData
      arr.push({ values: areaData })
      resolve(arr)
    })
  },
  // 优惠券列表
  getCouponList() {
    return new Promise(async (resolve, reject) => {
      const data = await common.getCouponList()
      data ? resolve(data) : reject()
    })
  },
  // 获取微信配置信息
  getWxConfig() {
    return new Promise(async (resolve, reject) => {
      const data = await common.getWxConfig()
      data ? resolve(data) : reject()
    })
  },
  // 商铺列表
  getStoreList(context, flag) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getStoreList(flag)
      data ? resolve(data) : reject()
    })
  },
  // 筛选商铺列表 (根据商品类型和海报类型)
  getFilterStoreList(context, payload) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getFilterStoreList(payload)
      data ? resolve(data) : reject()
    })
  },
  // 获取平台配置信息
  getPlatFormInfo() {
    return new Promise(async (resolve, reject) => {
      const data = await common.getPlatFormInfo()
      data ? resolve(data) : reject()
    })
  },
  // 获取用户UID
  getMerchantDetail(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getMerchantDetail(id)
      data ? resolve(data) : reject()
    })
  },
  // 获取商家配置的别名
  getAlias() {
    return new Promise(async (resolve, reject) => {
      const data = await common.getAlias()
      data ? resolve(data) : reject()
    })
  },
  // 获取商家分佣层级
  getUserLevel() {
    return new Promise(async (resolve, reject) => {
      const data = await common.getUserLevel()
      data ? resolve(data) : reject()
    })
  },
  // 根据微信code换取openid
  getOpenid(context, code) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getOpenid(code)
      data ? resolve(data) : reject()
    })
  },
  // 使用open_id绑定微信
  bindWx(context, id) {
    return new Promise(async (resolve, reject) => {
      const data = await common.bindWx(id)
      data ? resolve() : reject()
    })
  },
  // 使用union_id绑定微信
  bindWxByUnionID(context, id) {
    alert('action')
    return new Promise(async (resolve, reject) => {
      const data = await common.bindWxByUnionID(id)
      alert('data' + JSON.stringify(data))
      data ? resolve() : reject()
    })
  },
}
