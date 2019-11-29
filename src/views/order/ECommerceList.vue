<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="电商订单"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-search @search="_onSearch" placeholder="请填写搜索关键词" v-model="keyword" />
      <van-dropdown-menu>
        <van-dropdown-item :options="option1" @change="_changeOption1" v-model="status" />
        <van-dropdown-item :options="option2" @change="_changeOption2" v-model="pay_type" />
        <van-dropdown-item :options="option3" @change="_changeOption3" v-model="find_type" />
      </van-dropdown-menu>
      <div class="white-space"></div>
      <time-picker-box :pickEndTime="_pickEndTime" :pickStartTime="_pickStartTime"></time-picker-box>
      <div class="white-space"></div>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="item.order_id" v-for="item in list">
          <van-panel
            :desc="item.userphone"
            :status="_curStatus(item)"
            :title="item.username"
            @click="_goDetail(item.order_id)"
          >
            <van-row>
              <van-col span="6">订单编号：</van-col>
              <van-col span="18">{{ item.order_id }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row v-if="item.fetch_number !== '0'">
              <van-col span="6">取单编号：</van-col>
              <van-col span="18">{{ item.fetch_number }}</van-col>
            </van-row>
            <div class="white-space" v-if="item.fetch_number !== '0'"></div>
            <van-row>
              <van-col span="6">订单总价：</van-col>
              <van-col span="18">{{ item.total_price }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">应收总额：</van-col>
              <van-col span="18">{{ item.price }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">下单时间：</van-col>
              <van-col span="18">{{ $moment(item.create_time * 1000).format('YYYY-MM-DD HH:mm') }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">配送方式：</van-col>
              <van-col span="18">{{ deliverType[item.is_pick_in_store] }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row>
              <van-col span="6">配送地址：</van-col>
              <van-col span="18">{{ item.address }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <div slot="footer">
              <van-row>
                <van-col span="6">订单来源：</van-col>
                <van-col span="6">{{ item.order_from_name }}</van-col>
                <van-col class="text-right" span="12" v-html="item.pay_status"></van-col>
              </van-row>
            </div>
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
  name: 'eCommerceList',

  mixins: [],

  components: {
    TimePickerBox,
  },

  props: {},

  data() {
    return {
      option1: [],
      option2: [
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
      option3: [
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
      status: '-1',
      pay_type: '',
      find_type: 'oid',
      keyword: '',
      stime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      etime: this.$moment().format('YYYY-MM-DD'),
      list: [],
      page: 1,
      refreshing: false,
      finished: false,
      loading: false,
      deliverType: {
        0: '系统配送',
        1: '商家配送',
        2: '用户自提',
        3: '快递配送',
      },
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
    this._getOrderStatusList()
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getOrderStatusList', 'getECommerceList']),
    // 搜索商品
    _onSearch(value) {
      this.keyword = value
      this._onRefresh()
    },
    _changeOption1(data) {
      this.status = data
      this._onRefresh()
    },
    _changeOption2(data) {
      console.log(data)
      this.pay_type = data
      this._onRefresh()
    },
    _changeOption3(data) {
      this.find_type = data
      this._onRefresh()
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
    // 外卖订单状态列表
    _getOrderStatusList() {
      this.getOrderStatusList().then(res => {
        res.forEach(item => {
          item.text = item.label
          item.value = item.value + ''
        })
        this.option1 = res
      })
    },
    _onRefresh() {
      this.getECommerceList({
        page: 1,
        status: this.status,
        pay_type: this.pay_type,
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
    _onLoad() {
      this.getECommerceList({
        page: this.page,
        status: this.status,
        pay_type: this.pay_type,
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
    _curStatus(item) {
      if (item.status === '0') {
        return '可接单'
      }
      if (item.status === '1') {
        return '可操作'
      }
      if (item.is_pick_in_store === '3' && item.status === '2' && item.user_confirm === '0') {
        return '已发货'
      }
      if (item.is_pick_in_store === '3' && item.status === '2' && item.user_confirm > '0') {
        return '已确认收货'
      }
      if (item.status === '2') {
        return '已消费'
      }
      if (item.status === '3') {
        return '已评价'
      }
      if (item.status === '4') {
        if (item.cancel_type === '7') {
          return '超时退款'
        }
        return '已退款'
      }
      if (item.status === '5') {
        if (item.cancel_type === '7') {
          return '超时取消'
        }
        return '已取消'
      }
      if (item.status === '7' && item.paid === '1') {
        return '发货到自提'
      }
      if (item.status === '8') {
        return '已发货到自提'
      }
      if (item.status === '9') {
        return '自提点接货'
      }
      if (item.status === '10') {
        return '配送中'
      }
      if (item.order_from === '6') {
        return '已取消'
      }
      return '未支付'
    },
    _goDetail(id) {
      this.$router.push(`/order/eCommerceOrderDetail/${id}`)
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
/deep/.van-sticky {
  background-color: @gray-background-c;
}
.van-panel__footer {
  font-size: 14px;
  color: @black-c;
  .text-right {
    text-align: right;
  }
}
</style>
