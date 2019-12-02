<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="服务订单详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="订单信息">
      <van-cell :value="detail.order_no" title="订单编号"></van-cell>
      <van-cell :value="_statusLabel(detail.service_status, detail.status)" title="订单状态"></van-cell>
      <van-cell :value="detail.name" title="服务项目名称"></van-cell>
      <van-cell :value="detail.nickname" title="下单人"></van-cell>
      <van-cell :value="detail.phone" title="联系方式"></van-cell>
      <van-cell :value="$moment(detail.create_time * 1000).format('YYYY-MM-DD HH:mm')" title="下单时间"></van-cell>
      <van-cell :value="detail.unit_price" title="单件价格"></van-cell>
      <van-cell :value="detail.goods_num" title="购买数量"></van-cell>
      <van-cell :value="detail.price" title="支付金额"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'serviceOrderDetail',

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
    id && this._getServiceOrderDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getServiceOrderDetail']),
    _getServiceOrderDetail(id) {
      this.getServiceOrderDetail(id).then(res => {
        this.detail = res
      })
    },
    _statusLabel(s_status, status) {
      if (s_status === '1') {
        return '已服务'
      } else if (s_status === '2') {
        if (status === '2') {
          return '已取消'
        } else {
          return '待服务'
        }
      } else if (s_status === '3') {
        return '服务中'
      } else if (s_status === '4') {
        return '服务中'
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
