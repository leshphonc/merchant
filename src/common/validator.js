import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

// 导入所有默认规则
for (let rule in rules) {
  extend(rule, {
    ...rules[rule],
    message: zh_CN.messages[rule],
  })
}

// 定义自定义规则
extend('phone', {
  validate: value => {
    return new RegExp(/^[1][3-9][0-9]{9}$/).test(value)
  },
  message: '请输入正确的电话号码',
})

extend('decimal-max1', {
  validate: value => {
    return new RegExp(/^[0-9]{1}(\.[0-9])?$/).test(value)
  },
  message: '最多支持1位小数',
})

// 全局注册组件
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
