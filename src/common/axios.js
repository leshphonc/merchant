import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import { Notify, Toast } from 'vant'
import errorcode from '@/common/errorcode'

// axios全局请求拦截
axios.interceptors.request.use(
  config => {
    // console.log(config);
    Toast.loading({
      message: '加载中...',
      forbidClick: true,
      duration: 0,
    })
    // 转为formdata数据格式
    config.data = qs.stringify(config.data)
    return config
  },
  error => {
    console.log(error)
    Toast.fail(error.message)
  }
)
axios.interceptors.response.use(
  config => {
    // console.log(config);
    Toast.clear()
    if (config.data.errorCode !== errorcode.SUCCESS) {
      if (config.data.error === errorcode.SUCCESS) {
        return config.data.msg
      }
      if (config.data.errorCode === errorcode.NOTICKET || config.data.errorCode === errorcode.TIMEOUT) {
        Toast({
          message: '登录验证失效',
          icon: 'warn-o',
          forbidClick: true,
          duration: 1500,
          onClose: () => {
            router.replace('/login')
          },
        })
        return false
      }
      Notify({ type: 'warning', message: config.data.errorMsg })
      return false
    }
    return config.data.result
  },
  error => {
    console.log(error)
    Toast.fail(error.message)
  }
)
