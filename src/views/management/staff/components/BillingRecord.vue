<template>
  <div>
    <van-sticky :offset-top="offsetTop">
      <van-dropdown-menu>
        <van-dropdown-item :options="storeColumns" @change="_changeOption" v-model="store_id" />
        <van-dropdown-item ref="item" title="时间筛选">
          <time-picker
            :data="[startTime, endTime]"
            :pickEndTime="_pickEndTime"
            :pickStartTime="_pickStartTime"
            endLabel="结束时间"
            showDefault
            startLabel="开始时间"
          ></time-picker>
          <van-button @click="_search" block type="primary">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="index" v-for="(item, index) in list">
          <van-panel
            :desc="`x${item.goods_num}`"
            :icon="item.pic_info"
            :status="`¥${item.payment_money}`"
            :title="$moment(item.pay_time * 1000).format('YYYY-MM-DD HH:mm:ss')"
          >
            <div>
              <van-row>
                <van-col span="4">昵称：</van-col>
                <van-col span="20">{{ item.nickname }}</van-col>
              </van-row>
              <div class="white-space"></div>
              <van-row>
                <van-col span="4">店铺：</van-col>
                <van-col span="20">{{ item.name }}</van-col>
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
import TimePicker from '@/components/TimePicker'

export default {
  name: 'billingRecord',

  mixins: [],

  components: {
    TimePicker,
  },

  props: {
    storeColumns: {
      required: true,
      type: Array,
    },
  },

  data() {
    return {
      page: 1,
      list: [],
      refreshing: false,
      finished: false,
      loading: false,
      startTime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      endTime: this.$moment().format('YYYY-MM-DD'),
      store_id: '',
    }
  },

  computed: {
    offsetTop() {
      return (84 / 375) * document.body.clientWidth
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
    ...mapActions('staff', ['staffBillingRecord']),
    _pickStartTime(data) {
      this.startTime = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEndTime(data) {
      this.endTime = this.$moment(data).format('YYYY-MM-DD')
    },
    _changeOption(data) {
      this.store = data
      this._onRefresh()
    },
    // 刷新列表
    _onRefresh() {
      const { id } = this.$route.params
      this.staffBillingRecord({
        page: 1,
        store_id: this.store_id,
        staff_id: id,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新数据
    _onLoad() {
      const { id } = this.$route.params
      this.staffBillingRecord({
        page: this.page,
        store_id: this.store_id,
        staff_id: id,
        begin_time: this.startTime,
        end_time: this.endTime,
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
    _search() {
      this._onRefresh()
      this.$refs.item.toggle()
    },
  },
}
</script>

<style lang="less" scoped>
.van-cell__left-icon {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  .van-icon__image {
    width: 100%;
    height: 100%;
  }
}
.van-panel__content {
  padding: 10px 16px;
  font-size: 14px;
  color: @font-gray-c;
}
</style>
