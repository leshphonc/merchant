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

Vue.config.productionTip = false

Vue.prototype.$goBack = () => {
  router.go(-1)
}

Vue.prototype.$moment = moment
Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
