import Vue from 'vue'
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import zh_CN from 'vee-validate/dist/locale/zh_CN'

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zh_CN.messages[rule], // add its message
  })
}

// Add a rule.
extend('phone', {
  validate: value => {
    return new RegExp(/^[1][3-9][0-9]{9}$/).test(value)
  },
  message: '请输入正确的电话号码',
})

// Register it globally
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
