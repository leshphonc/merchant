<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="到店消费订单"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-dropdown-menu>
        <van-dropdown-item :options="storeColumns" @change="_changeOption" v-model="store" />
      </van-dropdown-menu>
      <div class="white-space"></div>
      <time-picker-box :pickEndTime="_pickEndTime" :pickStartTime="_pickStartTime"></time-picker-box>
      <div class="white-space"></div>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="item.order_id" v-for="item in list">
          <van-panel
            :desc="$moment(item.pay_time * 1000).format('YYYY-MM-DD HH:mm')"
            :icon="item.shop_logo"
            :title="item.name"
            @click="_goDetail(item.order_id)"
          >
            <van-row>
              <van-col span="6">订单号：</van-col>
              <van-col span="18">{{ item.store_id }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">总价：</van-col>
              <van-col span="18">{{ item.total_price }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">实付：</van-col>
              <van-col span="18">{{ item.balance_pay }} 元</van-col>
            </van-row>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
const user = JSON.parse(localStorage.getItem('merchant_user') || '{}')

import { mapActions } from 'vuex'
import TimePickerBox from '@/components/TimePickerBox'

export default {
  name: 'arrivalList',

  mixins: [],

  components: {
    TimePickerBox,
  },

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      store: '0',
      option: [],
      stime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      etime: this.$moment().format('YYYY-MM-DD'),
      storeColumns: [],
      refreshing: false,
      finished: false,
      loading: false,
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getArrivalOrderStoreList()
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getArrivalList', 'getArrivalOrderStoreList']),
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
    _onRefresh() {
      this.getArrivalList({
        page: 1,
        store_id: this.store,
        stime: this.stime,
        etime: this.etime,
      }).then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
      })
    },
    _onLoad() {
      this.getArrivalList({
        page: this.page,
        store_id: this.store,
        stime: this.stime,
        etime: this.etime,
      }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    _getArrivalOrderStoreList() {
      this.getArrivalOrderStoreList(user.mer_id).then(res => {
        const columns = []
        res.forEach(item => {
          columns.push({ text: item[0].name, value: item[0].store_id })
        })
        this.storeColumns = columns
      })
    },
    _goDetail(id) {
      this.$router.push(`/order/arrivalOrderDetail/${id}`)
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}

.van-cell__left-icon {
  font-size: 60px;
  height: 60px;
}

/deep/.van-sticky {
  background-color: @gray-background-c;
}
</style>
