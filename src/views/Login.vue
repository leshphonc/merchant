<template>
  <div class="container">
    <div class="group">
      <div class="title">Welcome</div>
      <van-field
        :border="false"
        class="input"
        label="账号"
        label-align="center"
        label-width="80"
        v-model="account"
      ></van-field>
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
  name: 'Login',

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

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions(['login']),
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
          },
        })
      })
    },
  },
}
</script>

<style lang="less">
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
      .van-field__control {
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
