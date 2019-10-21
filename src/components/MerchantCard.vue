<template>
  <div class="container">
    <van-row align="center" class="info" justify="center" type="flex">
      <van-col span="7">
        <div class="info-avatar"></div>
      </van-col>
      <van-col span="11">
        <div class="info-user van-ellipsis">Hi，Miss 欢迎回来！</div>
        <div class="info-price">账户余额（元）</div>
        <div class="info-balance van-ellipsis">99291092019201.12</div>
      </van-col>
      <van-col span="8" style="position: relative;">
        <i class="iconfont info-icon">&#xe637;</i>
        <div class="info-wallet">充值 | 提现</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
export default {
  name: 'MerchantCard',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped>
.container {
  background-image: url('../assets/image/merchant_card_bg.jpg');
  background-size: cover;
  height: 120px;

  .info {
    height: 100%;

    &-avatar {
      background-color: #fff;
      width: 60px;
      height: 60px;
      border-radius: 30px;
      margin: 0 auto;
    }

    &-user {
      font-weight: 600;
      color: #fff;
      font-size: 16px;
    }

    &-price {
      color: #fff;
      margin: 5px 0;
      font-size: 12px;
    }

    &-balance {
      color: #fff;
      font-weight: 600;
      font-size: 16px;
    }

    &-icon {
      position: absolute;
      top: -40px;
      right: 20px;
      font-size: 20px;
    }

    &-wallet {
      position: absolute;
      bottom: -35px;
      right: 10px;
      font-weight: 600;
      font-size: 16px;
    }
  }
}
</style>
