import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/vant'
import '@/common/axios'
import '@/common/echarts'
import '@/common/editor'
import '@/common/validator'
import '@/common/global'
import '@/assets/iconfont/iconfont.css'
import moment from 'moment'
import axios from 'axios'
import { Toast } from './common/vant'

Vue.config.productionTip = false

// 注册全局方法
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios
Vue.prototype.$goBack = () => {
  router.go(-1)
}

Vue.prototype.$reLogin = () => {
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
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
