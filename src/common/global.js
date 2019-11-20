import Vue from 'vue'

// 判断是否为app环境
Vue.prototype._isApp =
  navigator.userAgent.toLowerCase().indexOf('android_chengshang_app') !== -1 ||
  navigator.userAgent.toLowerCase().indexOf('ios_chengshang_app') !== -1

// app接口调用
Vue.prototype.$invokeAndroid = json => {
  if (navigator.userAgent.toLowerCase().indexOf('android_chengshang_app') !== -1) {
    window.android.invokeMethods(JSON.stringify(json))
  } else if (navigator.userAgent.toLowerCase().indexOf('ios_chengshang_app') !== -1) {
    window.location.href = 'ios:' + JSON.stringify(json)
  }
}

// 获取微信code
Vue.prototype.$getWXCode = appId => {
  const url = encodeURIComponent(window.location.href)
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${url}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`
}

// 微信支付
Vue.prototype.$WXPay = config => {
  return new Promise((resolve, reject) => {
    window.WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: config.appId, // 公众号名称，由商户传入
        timeStamp: config.timeStamp, // 时间戳，自1970年以来的秒数
        nonceStr: config.nonceStr, // 随机串
        package: config.package,
        signType: config.signType, // 微信签名方式：
        paySign: config.paySign, // 微信签名
      },
      res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          resolve()
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
        } else {
          reject()
        }
      }
    )
  })
}
