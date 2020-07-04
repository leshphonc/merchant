<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="智能屏销售列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <div class="white-space"></div>
      <time-picker-box
        :pickEndTime="_pickEndTime"
        :pickStartTime="_pickStartTime"
        timeType="datetime"
      ></time-picker-box>
      <div class="white-space"></div>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="index" v-for="(item, index) in list">
          <van-panel :desc="item.s_name" :status="_status(item.status)" :title="item.nickname">
            <div>
              <van-row>
                <van-col span="5">订单编号：</van-col>
                <van-col span="19">{{ item.order_no }}</van-col>
              </van-row>
              <van-row>
                <van-col span="5">价格：</van-col>
                <van-col span="19">¥ {{ item.price }}</van-col>
              </van-row>
              <van-row>
                <van-col span="5">支付金额：</van-col>
                <van-col span="19">¥ {{ item.pay_money }}</van-col>
              </van-row>
              <div class="commodity-box">
                <div>订单内商品：</div>
                <div :key="index2" class="commodity" v-for="(item2, index2) in item.list">
                  <van-row justify="space-between" type="flex">
                    <van-col offset="2" span="18">{{ item2.name }}</van-col>
                    <van-col span="4">x {{ item2.goods_num }}</van-col>
                  </van-row>
                </div>
              </div>
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
  name: 'smartScreenSalesRecord',

  mixins: [],

  components: {
    TimePickerBox,
  },

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      refreshing: false,
      finished: false,
      loading: false,
      startTime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD HH:mm'),
      endTime: this.$moment().format('YYYY-MM-DD HH:mm'),
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    finishText() {
      return this.list.length ? '没有更多了' : '暂无记录'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getSmartScreenSalesRecord']),
    _pickStartTime(data) {
      this.startTime = this.$moment(data).format('YYYY-MM-DD HH:mm')
      this._onRefresh()
    },
    _pickEndTime(data) {
      this.endTime = this.$moment(data).format('YYYY-MM-DD HH:mm')
      this._onRefresh()
    },
    // 刷新列表
    _onRefresh() {
      const { imax, id } = this.$route.params
      this.getSmartScreenSalesRecord({
        page: 1,
        store_id: id,
        id: imax,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新数据
    _onLoad() {
      const { imax, id } = this.$route.params
      this.getSmartScreenSalesRecord({
        page: this.page,
        store_id: id,
        id: imax,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
    _status(data) {
      let str = ''
      switch (data) {
        case '1':
          str = '店员挂单中'
          break
        case '2':
          str = '结算中'
          break
        case '3':
          str = '已支付'
          break
        case '4':
          str = '已取消'
          break
      }
      return str
    },
  },
}
</script>

<style lang="less" scoped>
.van-sticky {
  background-color: @gray-background-c;
}

.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
  overflow: auto;

  .van-row {
    margin: 3px 0;
  }
}
.commodity-box {
  margin-top: 18px;
  color: #222;
  .commodity {
    padding: 4px 8px 0px 8px;
    box-sizing: border-box;
  }
}
</style>
