<template>
  <div class="container">
    <div class="group">
      <div class="title">Welcome</div>
      <van-field :border="false" class="input" label="账号" label-align="center" label-width="80" v-model="account"></van-field>
      <van-field
        :border="false"
        class="input"
        label="密码"
        label-align="center"
        label-width="80"
        type="password"
        v-model="pwd"
      ></van-field>
      <van-button @click="_login" class="button" type="info">登录</van-button>
    </div>
    <img class="blur" src="@/assets/image/login_bg.jpeg" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'login',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      account: '',
      pwd: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const ticket = localStorage.getItem('ticket')
    if (ticket) {
      this.$router.push('/')
      this.$toast({
        duration: 800, // 持续展示 toast
        forbidClick: true,
        message: '欢迎回来',
      })
    }
  },

  destroyed() {},

  methods: {
    ...mapActions(['login', 'getWxConfig']),
    _login() {
      console.log(this.account)
      console.log(this.pwd)
      this.login({ account: this.account, pwd: this.pwd }).then(() => {
        this.$toast({
          icon: 'success',
          message: '登录成功',
          duration: 1000,
          onClose: () => {
            this.$router.replace('/')
            // 注册微信权限
            this.getWxConfig().then(res => {
              window.wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.appId, // 必填，公众号的唯一标识
                timestamp: res.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.nonceStr, // 必填，生成签名的随机串
                signature: res.signature, // 必填，签名
                jsApiList: [
                  // 必填，需要使用的JS接口列表
                  'onMenuShareTimeline',
                  'onMenuShareAppMessage',
                  'onMenuShareQQ',
                  'onMenuShareWeibo',
                  'scanQRCode',
                  'chooseImage',
                  'previewImage',
                  'uploadImage',
                  'downloadImage',
                  'getLocation',
                  'openLocation',
                  'getNetworkType',
                  'startRecord',
                  'stopRecord',
                  'onVoiceRecordEnd',
                  'playVoice',
                  'translateVoice',
                  'requireSoterBiometricAuthentication',
                  'getSupportSoter',
                  'addCard',
                  'chooseCard',
                  'openCard',
                  'hideAllNonBaseMenuItem',
                  'chooseWXPay',
                ],
              })
            })
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .blur {
    position: absolute;
    width: 108vw;
    height: 108vh;
    filter: blur(10px);
    z-index: -10;
    top: -15px;
    left: -15px;
  }

  .group {
    margin-top: 100px;
    text-align: center;
    .title {
      text-align: center;
      font-size: 30px;
      color: #fff;
      margin-bottom: 40px;
    }

    .input {
      width: 300px;
      margin: 10px auto;
      background: transparent;
      color: #ddd;
      border: 1px solid #ddd;
      border-radius: 20px;
      /deep/.van-field__control {
        color: #ddd;
      }
    }

    .button {
      width: 280px;
      margin-top: 180px;
    }
  }
}
</style>
