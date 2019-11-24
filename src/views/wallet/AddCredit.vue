<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="充值"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-radio-group v-model="radio">
      <van-cell-group title="充值方式">
        <van-cell center title="单元格">
          <div slot="icon">
            <img alt class="logo" src="@/assets/image/addCredit.jpeg" />
          </div>
          <van-radio name="1" slot="right-icon" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-cell-group title="充值金额">
      <van-field
        :error-message="errorMessage"
        :value="money"
        @touchstart.native.stop="show = true"
        label="¥"
        label-align="center"
        label-class="label-width"
        placeholder="请填写充值金额"
        readonly
      ></van-field>
    </van-cell-group>
    <van-button @click="_submit" type="primary">充值</van-button>
    <!-- 弹出层 -->
    <van-number-keyboard :show="show" @blur="show = false" @input="_changeMoney" extra-key="." v-model="money" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'addCredit',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      radio: '1',
      money: '',
      errorMessage: '',
      show: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const session_code = sessionStorage.getItem('merchant_wx_code')
    const { code } = this.$route.query
    if (!session_code && code) sessionStorage.setItem('merchant_wx_code', session_code)
    if (!this._isApp && !session_code && !code) {
      console.log('缓存没有code，url没有code，不是app')
      this.getWxConfig().then(res => {
        console.log(res)
        this.$getWXCode(res.appId)
      })
    }
  },

  destroyed() {},

  methods: {
    ...mapActions(['getMerchantDetail', 'getWxConfig', 'getPayInfo']),
    ...mapActions('wallet', ['createOrder', 'checkOrder']),
    _changeMoney() {
      this.$nextTick(() => {
        console.log(this.money)
        this.errorMessage = this.money ? '' : '充值金额必填'
      })
    },
    async _submit() {
      // 检查锁
      if (this.loading) return
      if (this.money) {
        console.log('充值')
        // 创建订单获 -> 取订单id, type
        this.createOrder(this.money).then(async res => {
          const userInfo = JSON.parse(localStorage.getItem('merchant_user'))
          const { order_id, type } = res
          // 判断是否app充值
          if (this._isApp) {
            // app充值
            const info = await this.getMerchantDetail(userInfo.mer_id)
            const json = {
              action: 'WxPay',
              mer_id: userInfo.mer_id,
              order_id: order_id,
              order_type: type,
              paymoney: this.money,
              uid: info.uid,
            }
            window._invokeAndroid(json)
          } else {
            // 加锁
            this.loading = true
            // 微信环境充值
            const code = sessionStorage.getItem('merchant_wx_code')
            console.log(code)
            console.log('不是app')
            const { openid } = await this.checkOrder({
              id: order_id,
              type,
              code,
            })
            const config = await this.getPayInfo({
              order_id,
              order_type: type,
              pay_type: 'weixin',
              openId: openid,
            })
            this.$wxPay(config)
              .then(() => {
                this.$toast.success({
                  message: '充值成功',
                  forbidClick: true,
                  duration: 1500,
                  onClose: () => {
                    // 解锁
                    this.loading = false
                    this.$goBack()
                  },
                })
              })
              .catch(() => {
                console.log('支付失败')
              })
          }
        })
      } else {
        this._changeMoney()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.logo {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-right: 10px;
}

.van-button {
  width: 90%;
  margin-left: 5%;
  margin-top: 5%;
}

/deep/.label-width {
  width: 50px;
}
</style>