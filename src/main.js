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

Vue.config.productionTip = false
Vue.prototype._goBack = () => {
  router.go(-1)
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
