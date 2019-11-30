<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="电商订单详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="订单信息">
      <van-cell :value="detail.order.order_id" title="订单编号"></van-cell>
    </van-cell-group>
    <van-cell-group title="支付信息">
      <van-cell :value="$moment(detail.order.pay_time * 1000).format('YYYY-MM-DD HH:mm')" title="支付时间"></van-cell>
      <van-cell :value="detail.order.pay_type_str" title="支付方式"></van-cell>
      <van-cell :value="`¥ ${detail.order.price}`" title="应收总额"></van-cell>
      <van-cell :value="`¥ ${detail.order.no_discount_money}`" title="不可优惠金额" v-if="detail.order.no_discount_money > 0"></van-cell>
      <van-cell :value="`-¥ ${detail.order.card_price}`" title="商家优惠券" v-if="detail.order.card_price > 0"></van-cell>
      <van-cell :value="`-¥ ${detail.order.coupon_price}`" title="系统优惠券" v-if="detail.order.coupon_price > 0"></van-cell>
      <van-cell :value="`-¥ ${detail.order.score_deducte}`" title="积分抵扣" v-if="detail.order.score_deducte > 0"></van-cell>
      <van-cell :value="`-¥ ${detail.order.card_give_money}`" title="会员卡赠送余额支付" v-if="detail.order.card_give_money > 0"></van-cell>
      <van-cell :value="`-¥ ${detail.order.merchant_balance}`" title="商家余额支付" v-if="detail.order.merchant_balance > 0"></van-cell>
      <van-cell :value="`-¥ ${detail.order.balance_pay}`" title="系统余额支付" v-if="detail.order.balance_pay > 0"></van-cell>
      <van-cell
        :title="detail.order.pay_type_str"
        :value="`-¥ ${detail.order.payment_money}`"
        v-if="detail.order.payment_money > 0"
      ></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'arrivalOrderDetail',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      detail: {},
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._getArrivalOrderDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getArrivalOrderDetail']),
    _getArrivalOrderDetail(id) {
      this.getArrivalOrderDetail(id).then(res => {
        this.detail = res
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
