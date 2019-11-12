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
  getProvince(context, { flag }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getProvince()
      if (data) {
        if (flag && data.length > 1) {
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
  getCity(context, { id, flag }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getCity(id)
      if (data) {
        if (flag && data.length > 1) {
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
  getArea(context, { id, flag }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getArea(id)
      if (data) {
        if (flag && data.length > 1) {
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
  getCircle(context, { id, flag }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getCircle(id)
      if (data) {
        if (flag && data.length > 1) {
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
  getMarket(context, { id, flag }) {
    return new Promise(async (resolve, reject) => {
      const data = await common.getMarket(id)
      if (data) {
        if (flag && data.length > 1) {
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
      // 查询所有省份
      const provinceData = await dispatch('getProvince', { flag: true })
      // 找出当前省份
      const provinceItem = provinceData.find(item => item.value === province)
      // 查询出省份下的城市
      const cityData = await dispatch('getCity', { id: province, flag: true })
      provinceItem.children = cityData
      // 找出当前城市
      const cityItem = cityData.find(item => item.value === city)
      // 查询城市下的地区
      const areaData = await dispatch('getArea', { id: area, flag: true })
      cityItem.children = areaData
      // 找出当前地区
      const areaItem = areaData.find(item => item.value === area)
      // 查询地区下的商圈
      const circleData = await dispatch('getCircle', { id: circle, flag: true })
      if (!circleData) {
        resolve(provinceData)
        return false
      }
      areaItem.children = circleData
      // 找出当前商圈
      const circleItem = circleData.find(item => item.value === circle)
      // 查询商圈下的商盟
      const marketData = await dispatch('getMarket', { id: market, flag: true })
      if (!marketData) {
        resolve(provinceData)
        return false
      }
      circleItem.children = marketData
      resolve(provinceData)
    })
  },
  // 查询默认地址级联数据
  getDefaultAddressColumnsForPicker({ dispatch }) {
    return new Promise(async resolve => {
      const arr = []
      // 查询所有省份
      const provinceData = await dispatch('getProvince', { flag: true })
      arr.push({ values: provinceData })
      // 查询出省份下的城市
      const cityData = await dispatch('getCity', { id: provinceData[0].value, flag: true })
      provinceData[0].children = cityData
      arr.push({ values: cityData })
      // 查询城市下的地区
      const areaData = await dispatch('getArea', { id: cityData[0].value, flag: true })
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
}
