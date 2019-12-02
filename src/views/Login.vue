<template>
  <div class="container">
    <div class="group">
      <div class="title">
        <div class="img-box">
          <img :src="logo" alt />
        </div>
        <div>管理中心</div>
      </div>
      <van-field
        :border="false"
        class="input"
        label-align="center"
        label-width="80"
        left-icon="user-o"
        placeholder="请输入账号"
        v-model="account"
      ></van-field>
      <van-field
        :border="false"
        class="input"
        label-align="center"
        label-width="80"
        left-icon="closed-eye"
        placeholder="请输入密码"
        type="password"
        v-model="pwd"
      ></van-field>
      <van-button @click="_login" class="button" round type="primary">登录</van-button>
    </div>
    <!-- <img class="blur" src="@/assets/image/login_bg.jpeg" /> -->
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
      logo: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    let logo = ''
    if (process.env.VUE_APP_ENV === 'cs') {
      logo = require('@/assets/image/logo.jpg')
    } else {
      logo = require('@/assets/image/xyzg_logo.png')
    }
    this.logo = logo
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
    // filter: blur(10px);
    z-index: -10;
    top: -15px;
    left: -15px;
  }

  .group {
    margin-top: 60px;
    text-align: center;
    .title {
      text-align: center;
      font-size: 20px;
      color: rgb(102, 102, 102);
      margin-bottom: 60px;
      .img-box {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 28vw;
        box-shadow: 0 0 8px 1px #ccc;
        border: 1px solid #ccc;
        box-sizing: border-box;
        width: 31vw;
        height: 31vw;
        margin: 0 auto 15px;
        img {
          width: 27vw;
          height: 27vw;
          border-radius: 27vw;
        }
      }
    }

    .input {
      width: 300px;
      margin: 10px auto;
      background: transparent;
      border-bottom: 1px solid #ddd;
      margin-bottom: 20px;
      padding-left: 20px;
      /deep/.van-field__left-icon {
        color: @font-gray-c;
      }
      /deep/.van-field__control {
        color: @font-gray-c;
        padding-left: 20px;
      }
    }

    .button {
      width: 280px;
      margin-top: 70px;
    }
  }
}
</style>
