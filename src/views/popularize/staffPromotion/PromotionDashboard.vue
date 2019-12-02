<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="店员推广统计"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-dropdown-menu>
        <van-dropdown-item :options="storeColumns" @change="_changeOption" v-model="store" />
      </van-dropdown-menu>
      <div class="white-space"></div>
      <time-picker-box :pickEndTime="_pickEndTime" :pickStartTime="_pickStartTime"></time-picker-box>
      <div class="white-space"></div>
      <van-grid :column-num="5">
        <van-grid-item :text="`扫码总人数: ${scan} 人`" icon="photo-o" />
        <van-grid-item :text="`绑粉总人数: ${fans} 人`" icon="photo-o" />
        <van-grid-item :text="`购买总人数: ${sale} 人`" icon="photo-o" />
        <van-grid-item :text="`销售佣金: ${saleMoney} 元`" icon="photo-o" />
        <van-grid-item :text="`推广佣金: ${spreadMoney} 元`" icon="photo-o" />
      </van-grid>
    </van-sticky>
    <van-cell
      :key="index"
      :label="`推广佣金: ${item.spread_money} 元  销售佣金: ${item.sale_money} 元`"
      :title="item.name"
      :to="`/staffPromotion/promotionDetail/${item.id}/${stime}/${etime}`"
      is-link
      v-for="(item, index) in list"
    ></van-cell>
  </div>
</template>

<script>
// const user = JSON.parse(localStorage.getItem('merchant_user') || '{}')
import TimePickerBox from '@/components/TimePickerBox'
import { mapActions } from 'vuex'

export default {
  name: 'promotionDashboard',

  mixins: [],

  components: {
    TimePickerBox,
  },

  props: {},

  data() {
    return {
      list: [], //店员数据统计
      saleMoney: 0.0,
      spreadMoney: 0.0,
      fans: 0,
      sale: 0,
      scan: 0,
      store: '',
      stime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      etime: this.$moment().format('YYYY-MM-DD'),
      storeColumns: [], //店铺列表
      refreshing: false,
      finished: false,
      loading: false,
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getArrivalOrderStoreList()
    this._onRefresh()
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('staffPromotion', ['getPromotionStatistics', 'getPromotionStatisticsStaffList']),
    _changeOption(data) {
      this.store = data
      this._onRefresh()
    },
    _pickStartTime(data) {
      this.stime = this.$moment(data).format('YYYY-MM-DD')
      this._onRefresh()
    },
    _pickEndTime(data) {
      this.etime = this.$moment(data).format('YYYY-MM-DD')
      this._onRefresh()
    },

    _getArrivalOrderStoreList() {
      this.getStoreList(1).then(res => {
        const columns = []
        res.store_list.forEach(item => {
          columns.push({ text: item.label, value: item.value })
        })
        this.storeColumns = columns
      })
    },
    _onRefresh() {
      this.getPromotionStatistics({
        store_id: this.store,
        starttime: this.stime,
        endtime: this.etime,
      }).then(res => {
        this.saleMoney = res.sale_money
        this.spreadMoney = res.spread_money
        this.fans = res.fans
        this.sale = res.sale
        this.scan = res.scan
        this.refreshing = false
      })
      this.getPromotionStatisticsStaffList({
        store_id: this.store,
        starttime: this.stime,
        endtime: this.etime,
      }).then(res => {
        res.forEach(item => {
          item.sale_money = item.sale_money == null ? 0.0 : item.sale_money
          item.spread_money = item.spread_money == null ? 0.0 : item.spread_money
        })
        this.list = res
        this.refreshing = false
      })
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.van-sticky {
  background-color: @gray-background-c;
}
</style>
