<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="套餐订单详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="订单信息">
      <van-cell :value="detail.order_no" title="订单编号"></van-cell>
      <van-cell :value="detail.nickname" title="下单人"></van-cell>
      <van-cell :value="detail.phone" title="联系方式"></van-cell>
      <van-cell :value="$moment(detail.create_time * 1000).format('YYYY-MM-DD HH:mm')" title="下单时间"></van-cell>
      <van-cell :value="detail.unit_price" title="单件价格"></van-cell>
      <van-cell :value="detail.package_num" title="购买数量"></van-cell>
      <van-cell :value="detail.pay_money" title="支付金额"></van-cell>
    </van-cell-group>
    <van-cell-group title="套餐内包含商品" v-if="goods.length">
      <van-card
        :key="index"
        desc="描述信息"
        num="2"
        price="2.00"
        thumb="https://img.yzcdn.cn/vant/ipad.jpeg"
        title="商品标题"
        v-for="(item, index) in goods"
      >
        <template #tags>
          <van-tag plain type="danger">标签</van-tag>
          <van-tag plain type="danger">标签</van-tag>
        </template>
        <template #footer>
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </template>
      </van-card>
    </van-cell-group>
    <van-cell-group title="套餐内包含服务" v-if="services.length">
      <van-card
        :key="index"
        :num="item.goods_num"
        :price="item.pay_price"
        :thumb="item.goods_img"
        :title="item.name"
        v-for="(item, index) in services"
      >
        <template #footer>
          <div style="margin: 4px 0">服务人员：{{ item.supply_staff_name }} - {{ _servicesStatus(item) }}</div>
        </template>
      </van-card>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'packageOrderDetail',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      detail: {},
      goods: [],
      services: [],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._getPackageOrderDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getPackageOrderDetail']),
    _getPackageOrderDetail(id) {
      this.getPackageOrderDetail(id).then(res => {
        this.detail = res.order
        this.goods = res.goods
        this.services = res.appoint
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
    _servicesStatus(item) {
      let str = ''
      switch (item.supply_status) {
        case '0':
          str = '失败'
          break
        case '1':
          str = '等待接单'
          break
        case '2':
          str = '接单'
          break
        case '3':
          str = '完成'
          break
        case '4':
          str = '已确认'
          break
        case '5':
          str = '重新服务'
          break
      }

      return str
    },
  },
}
</script>

<style lang="less" scoped></style>
