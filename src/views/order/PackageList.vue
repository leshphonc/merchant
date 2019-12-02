<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="套餐订单"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-search @search="_onSearch" placeholder="请填写搜索关键词" v-model="keyword" />
      <van-dropdown-menu>
        <van-dropdown-item :options="option" @change="_changeOption" v-model="find_type" />
      </van-dropdown-menu>
      <div class="white-space"></div>
      <time-picker-box :pickEndTime="_pickEndTime" :pickStartTime="_pickStartTime"></time-picker-box>
      <div class="white-space"></div>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="item.id" v-for="item in list">
          <van-panel
            :desc="$moment(item.create_time * 1000).format('YYYY-MM-DD HH:mm')"
            :icon="item.pic"
            :status="`${item.day_num}天有效期`"
            :title="item.meal_name"
            @click="_goDetail(item.id)"
          >
            <van-row>
              <van-col span="6">下单人：</van-col>
              <van-col span="18">{{ item.nickname }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">联系方式：</van-col>
              <van-col span="18">{{ item.phone }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">总价：</van-col>
              <van-col span="18">{{ item.pay_money }} 元</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">购买数量：</van-col>
              <van-col span="18">{{ item.meal_num }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">订单编号：</van-col>
              <van-col span="18">{{ item.order_no }}</van-col>
            </van-row>
            <div class="white-space"></div>
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
  name: 'packageList',

  mixins: [],

  components: {
    TimePickerBox,
  },

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      stime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      etime: this.$moment().format('YYYY-MM-DD'),
      find_type: 'oid',
      keyword: '',
      option: [
        {
          text: '订单号',
          value: 'oid',
        },
        {
          text: '用户电话',
          value: 'dh',
        },
        {
          text: '用户姓名',
          value: 'xm',
        },
      ],
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

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('order', ['getPackageList']),
    _changeOption(data) {
      this.find_type = data
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
    // 搜索商品
    _onSearch(value) {
      this.keyword = value
      this._onRefresh()
    },
    // 异步更新电商商品数据
    _onLoad() {
      this.getPackageList({
        page: this.page,
        searchtype: this.find_type,
        stime: this.stime,
        etime: this.etime,
        keyword: this.keyword,
      }).then(res => {
        this.loading = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.list)
      })
    },
    // 刷新套餐列表
    _onRefresh() {
      this.getPackageList({
        page: 1,
        searchtype: this.find_type,
        stime: this.stime,
        etime: this.etime,
        keyword: this.keyword,
      }).then(res => {
        this.page = 2
        this.list = res.list
        this.refreshing = false
      })
    },
    // 进入详情
    _goDetail(id) {
      this.$router.push(`/order/packageOrderDetail/${id}`)
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
