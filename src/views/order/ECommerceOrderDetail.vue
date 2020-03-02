<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="零售订单详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="订单信息">
      <van-cell :value="detail.order_id" title="订单编号"></van-cell>
      <van-cell :value="detail.fetch_number" title="取单编号" v-if="detail.fetch_number !== '0'"></van-cell>
      <van-cell :value="detail.real_orderid" title="流水号"></van-cell>
      <van-cell :value="detail.create_time" title="下单时间"></van-cell>
      <van-cell :value="detail.expect_use_time" title="期望送达时间"></van-cell>
      <van-cell :value="detail.order_from_txt" title="订单来源"></van-cell>
      <van-cell :value="detail.username" title="收货人名称"></van-cell>
      <van-cell :value="detail.userphone" title="收货人电话"></van-cell>
      <van-cell :value="detail.register_phone" title="注册电话"></van-cell>
      <van-cell :value="detail.goods_type === '0' ? '实体商品订单' : '虚拟商品订单'" title="订单类型"></van-cell>
      <van-cell :value="detail.note" title="用户备注"></van-cell>
    </van-cell-group>
    <van-cell-group title="配送信息">
      <van-cell :value="detail.deliver_str" title="配送方式"></van-cell>
      <van-cell :value="detail.address" title="收货地址"></van-cell>
    </van-cell-group>
    <van-cell-group title="商品信息">
      <div :key="index" v-for="(item, index) in commodityList">
        <van-cell :key="index2" :title="item2.name" class="commodity-item" v-for="(item2, index2) in item.list">
          <span>x{{ item2.num }}</span>
          <span>¥{{ item2.total }}</span>
          <span>¥{{ item2.discount_price }}</span>
        </van-cell>
      </div>
      <van-cell :title="pack_alias" :value="`¥${detail.packing_charge}`"></van-cell>
      <van-cell :title="freight_alias" :value="`¥${detail.freight_charge}`"></van-cell>
      <van-cell
        :title="`订单 ¥${detail.discount_price}`"
        :value="`优惠  - ¥${detail.minus_price}`"
        class="red-font"
      ></van-cell>
    </van-cell-group>
    <van-cell-group title="支付信息">
      <van-cell :value="detail.pay_time" title="支付时间"></van-cell>
      <van-cell :value="detail.pay_type_str" title="支付方式"></van-cell>
      <van-cell :value="detail.change_price > 0 ? detail.price : `¥${detail.go_pay_price}`" title="应收总额"></van-cell>
      <van-cell
        :value="`${detail.minus_card_discount > 0 ? '- ' : ''}¥${detail.minus_card_discount}`"
        title="商家会员卡折扣"
      ></van-cell>
      <van-cell :value="`${detail.balance_pay > 0 ? '- ' : ''}¥${detail.balance_pay}`" title="系统余额支付"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'eCommerceOrderDetail',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      detail: {},
      expressNo: '',
      pack_alias: '',
      freight_alias: '',
      commodityList: [],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._getECommerceOrderDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getECommerceOrderDetail']),
    _getECommerceOrderDetail(id) {
      this.getECommerceOrderDetail(id).then(res => {
        this.detail = res.order_details
        this.expressNo = res.order_details.express_number
        this.pack_alias = res.pack_alias
        this.freight_alias = res.freight_alias
        this.commodityList = res.info
      })
    },
  },
}
</script>

<style lang="less" scoped>
.commodity-item {
  .van-cell__value {
    & > span:nth-child(2) {
      text-decoration: line-through;
    }
    & > span {
      margin: 0 4px;
    }
  }
}
.red-font {
  .van-cell__value {
    color: @red-c;
  }
}
</style>
