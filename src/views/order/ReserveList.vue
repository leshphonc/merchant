<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="预定订单"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-search @search="_onSearch" placeholder="请填写搜索关键词" v-model="keyword" />
      <van-dropdown-menu>
        <van-dropdown-item :options="option1" @change="_changeOption1" v-model="status" />
        <van-dropdown-item :options="option2" @change="_changeOption2" v-model="find_type" />
      </van-dropdown-menu>
      <div class="white-space"></div>
      <TimePickerBox :pickEndTime="_pickEndTime" :pickStartTime="_pickStartTime"></TimePickerBox>
      <div class="white-space"></div>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="item.order_id" v-for="item in list">
          <van-panel
            :desc="item.appoint_date"
            :status="item.appoint_type === '1' ? '上门服务' : '到店服务'"
            :title="item.appoint_name"
          >
            <van-row>
              <van-col span="6">预定人：</van-col>
              <van-col span="18">{{ item.nickname }}</van-col>
            </van-row>
            <van-row>
              <van-col span="6">预定项目：</van-col>
              <van-col span="18">{{ item.appoint_name }}</van-col>
            </van-row>
            <van-row>
              <van-col span="6">服务地址：</van-col>
              <van-col span="18">{{ item.store_adress }}</van-col>
            </van-row>
            <van-row>
              <van-col span="6">订单总价：</van-col>
              <van-col span="18">
                {{ item.product_id > 0 ? item.product_price : item.appoint_price }}
                {{ item.service_status > 0 ? '（已支付）' : '（未支付）' }}
              </van-col>
            </van-row>
            <van-row>
              <van-col span="6">服务地址：</van-col>
              <van-col span="18">{{ item.store_adress }}</van-col>
            </van-row>
            <van-row>
              <van-col span="6">下单时间：</van-col>
              <van-col span="18">{{ item.order_time }}</van-col>
            </van-row>
            <van-row>
              <van-col span="6">服务状态：</van-col>
              <van-col span="18">{{ _serviceStatus(item) }}</van-col>
            </van-row>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePickerBox from '@/components/TimePickerBox'

export default {
  name: 'reserveList',

  mixins: [],

  components: {
    TimePickerBox,
  },

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      keyword: '',
      status: '',
      find_type: 'order_id',
      stime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      etime: this.$moment().format('YYYY-MM-DD'),
      loading: false,
      finished: false,
      refreshing: false,
      option1: [
        {
          text: '全部方式',
          value: '',
        },
        {
          text: '微信支付',
          value: 'weixin',
        },
        {
          text: '余额支付',
          value: 'balance',
        },
      ],
      option2: [
        {
          text: '订单编号',
          value: 'order_id',
        },
        {
          text: '订单流水号',
          value: 'orderid',
        },
        {
          text: '第三方支付流水号',
          value: 'third_id',
        },
        {
          text: '客户名称',
          value: 'name',
        },
        {
          text: '客户电话',
          value: 'phone',
        },
      ],
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

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('order', ['getReserveList']),
    // 异步更新电商商品数据
    _onLoad() {
      this.getReserveList({
        page: this.page,
        pay_type: this.status,
        searchtype: this.find_type,
        stime: this.stime,
        etime: this.etime,
        keyword: this.keyword,
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
    // 刷新套餐列表
    _onRefresh() {
      this.getReserveList({
        page: 1,
        pay_type: this.status,
        searchtype: this.find_type,
        stime: this.stime,
        etime: this.etime,
        keyword: this.keyword,
      }).then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
      })
    },
    // 搜索商品
    _onSearch(value) {
      this.keyword = value
      this._onRefresh()
    },
    // 选项1更改
    _changeOption1(value) {
      this.status = value
      this._onRefresh()
    },
    // 选项2更改
    _changeOption2(value) {
      this.find_type = value
    },
    _pickStartTime(data) {
      this.stime = this.$moment(data).format('YYYY-MM-DD')
      this._onRefresh()
      console.log(data)
    },
    _pickEndTime(data) {
      this.etime = this.$moment(data).format('YYYY-MM-DD')
      this._onRefresh()
      console.log(data)
    },
    // 进入详情
    _goDetail(id) {
      console.log(id)
      this.$router.push(`/order/groupBuyOrderDetail/${id}`)
    },
    _serviceStatus(item) {
      if (item.paid === '0') {
        if (item.service_status === '0') {
          if (item.supply_status === '1') return '未服务'
          if (item.supply_status === '2') return '服务中'
          if (item.supply_status === '3') return '已服务'
        } else if (item.service_status === '1') {
          return '已服务'
        } else if (item.service_status === '2') {
          return '已评价'
        }
      } else if (item.paid === '1') {
        if (item.service_status === '0') {
          if (item.supply_status === '1') return '未服务'
          if (item.supply_status === '2') return '服务中'
          if (item.supply_status === '3') return '已服务'
        } else if (item.service_status === '1') {
          return '已服务'
        } else if (item.service_status === '2') {
          return '已评价'
        } else if (item.service_status === '3') {
          return '已付款，已服务'
        }
      } else if (item.paid === '2') {
        return '已退款'
      } else if (item.paid === '3') {
        return '用户已取消'
      } else {
        return '订单异常'
      }
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.van-sticky {
  background-color: @gray-background-c;
}
</style>
