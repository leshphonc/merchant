import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/common/vant'
import '@/common/axios'
import '@/common/echarts'
import '@/common/editor'
import '@/common/validator'
import '@/assets/iconfont/iconfont.css'
import moment from 'moment'
import axios from 'axios'
console.log(store._actions.getArea)

Vue.config.productionTip = false

// 注册全局方法
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios
Vue.prototype.$goBack = () => {
  router.go(-1)
}
// app接口调用注册
Vue.prototype.$invokeAndroid = json => {
  if (navigator.userAgent.toLowerCase().indexOf('android_chengshang_app') !== -1) {
    window.android.invokeMethods(JSON.stringify(json))
  } else if (navigator.userAgent.toLowerCase().indexOf('ios_chengshang_app') !== -1) {
    window.location.href = 'ios:' + JSON.stringify(json)
  }
}

// 判断是否为app环境
Vue.prototype._isApp =
  navigator.userAgent.toLowerCase().indexOf('android_chengshang_app') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('ios_chengshang_app') !== -1

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
