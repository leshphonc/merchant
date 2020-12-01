import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { Notify, Toast } from 'vant'
import errorcode from '@/common/errorcode'

// axios.defaults.timeout = 4000
// axios.defaults.retry = 4
// axios.defaults.retryDelay = 1000

// axios全局请求拦截
axios.interceptors.request.use(
  config => {
    // Toast.loading({
    //   message: '加载中...',
    //   forbidClick: true,
    //   duration: 0,
    // })
    // 转为formdata数据格式
    config.data = qs.stringify(config.data, { arrayFormat: 'indices' })
    return config
  },
  err => {
    return Promise.reject(err)
    // var config = err.config
    // // If config does not exist or the retry option is not set, reject
    // if (!config || !config.retry) return Promise.reject(err)

    // // Set the variable for keeping track of the retry count
    // config.__retryCount = config.__retryCount || 0

    // // Check if we've maxed out the total number of retries
    // if (config.__retryCount >= config.retry) {
    //   // Reject with the error
    //   return Promise.reject(err)
    // }

    // // Increase the retry count
    // config.__retryCount += 1

    // // Create new promise to handle exponential backoff
    // var backoff = new Promise(function(resolve) {
    //   setTimeout(function() {
    //     resolve()
    //   }, config.retryDelay || 1)
    // })

    // // Return the promise in which recalls axios to retry the request
    // return backoff.then(function() {
    //   return axios(config)
    // })
  }
)
axios.interceptors.response.use(
  config => {
    // Toast.clear()
    if (config.data.errorCode !== errorcode.SUCCESS) {
      // 兼容上传oss图片错误
      if (config.data.error === errorcode.SUCCESS) {
        return config.data.msg
      }
      // 兼容获取logo
      if (config.data.code == 200) {
        return config.data.wap_merchant_logo
      }
      // 是否为登录验证过期
      if (config.data.errorCode === errorcode.NOTICKET || config.data.errorCode === errorcode.TIMEOUT) {
        Toast({
          message: '请重新登录',
          icon: 'warn-o',
          forbidClick: true,
          duration: 1500,
          onClose: () => {
            localStorage.removeItem('ticket')
            localStorage.removeItem('merchant_global')
            localStorage.removeItem('merchant_user')
            router.replace('/login')
          },
        })
        return false
      }
      if (config.data.code === 0) {
        return config.data
      }
      if (config.data.code === 6001) {
        return config.data
      }
      // 是否非法操作
      if (!config.data.errorCode) {
        Toast({
          message: '后台接口未配置，请联系后台管理员',
          duration: 1500,
        })
        return false
      }
      Notify({ type: 'warning', message: config.data.errorMsg })
      return config.data
    }
    return config.data.result
  },
  error => {
    Toast.fail(error.message)
    return Promise.reject(error)
  }
)
