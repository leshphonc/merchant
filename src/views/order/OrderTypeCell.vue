<template>
  <div>
    <div :key="index" v-for="(item, index) in list">
      <div class="white-space"></div>
      <van-cell-group>
        <van-cell :title="item.name" :to="item.url" :value="item.count" is-link />
      </van-cell-group>
    </div>
    <div class="tab-bar-holder-sp"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'orderTypeCell',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      map: {
        团购订单: '/order/groupBuyList',
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getOrderTypeList()
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getOrderTypeList']),
    _getOrderTypeList() {
      this.getOrderTypeList().then(res => {
        res.push({ name: '到店消费订单', count: '0' })
        res.forEach(item => {
          switch (item.name) {
            case '团购订单':
              item.url = '/order/groupBuyList'
              break
            case '预定订单':
              item.url = '/order/reserveList'
              break
            case '零售订单':
              item.url = '/order/takeAwayList'
              break
            case '外卖订单':
              item.url = '/order/takeAwayList'
              break
            case '服务订单':
              item.url = '/order/serviceList'
              break
            case '套餐订单':
              item.url = '/order/packageList'
              break
            case '电商订单':
              item.url = '/order/eCommerceList'
              break
            case '到店消费订单':
              item.url = '/order/arrivalList'
              break
            default:
              item.url = '404'
          }
        })
        this.list = res
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
