<template>
  <div>
    <van-sticky :offset-top="offsetTop">
      <van-dropdown-menu>
        <van-dropdown-item :options="option1" @change="_onRefresh" title-class="maxWidth" v-model="value1" />
        <van-dropdown-item :options="option2" @change="_onRefresh" title-class="maxWidth" v-model="value2" />
      </van-dropdown-menu>
      <van-row>
        <div class="white-space"></div>
        <van-col offset="1" span="8">
          <div @click="_controlStartTimePicker" class="filter-box">
            <div class="van-ellipsis">{{ startTimeLabel }}</div>
            <i class="iconfont">&#xe6f0;</i>
          </div>
          <div class="white-space"></div>
        </van-col>
        <van-col offset="1" span="8">
          <div @click="_controlEndTimePicker" class="filter-box">
            <div class="van-ellipsis">{{ endTimeLabel }}</div>
            <i class="iconfont">&#xe6f0;</i>
          </div>
          <div class="white-space"></div>
        </van-col>
      </van-row>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <div :key="item.id" v-for="item in list">
          <van-panel
            :class="status[item.income].label === '收入' ? 'income' : 'expenditure'"
            :desc="item.desc"
            :status="`¥ ${status[item.income].str}${item.money}`"
            :title="status[item.income].label"
          >
            <van-row>
              <van-col span="12">
                <div>余额：{{ item.now_mer_money }}</div>
              </van-col>
              <van-col span="12">
                <div>{{ $moment(item.use_time * 1000).format('YYYY-MM-DD HH:mm:ss') }}</div>
              </van-col>
            </van-row>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 弹出层 -->
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        :formatter="$timeFormatter"
        :max-date="endTime"
        :value="startTime"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        type="date"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker
        :formatter="$timeFormatter"
        :min-date="startTime"
        :value="endTime"
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        type="date"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'incomeAndExpenditure',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      refreshing: false,
      finished: false,
      status: {
        1: {
          label: '收入',
          color: '#669900',
          str: '+',
        },
        2: {
          label: '支出',
          color: '#dd4a68',
          str: '-',
        },
      },
      value1: 'all',
      value2: '',
      option1: [],
      option2: [],
      showStartTimePicker: false,
      showEndTimePicker: false,
      startTime: new Date(this.$moment().subtract(30, 'days')),
      endTime: new Date(),
    }
  },

  computed: {
    offsetTop() {
      return (90 / 375) * document.body.clientWidth
    },
    startTimeLabel() {
      return this.$moment(this.startTime).format('YYYY-MM-DD')
    },
    endTimeLabel() {
      return this.$moment(this.endTime).format('YYYY-MM-DD')
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getCategory()
    this._getStoreList()
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('wallet', ['incomeAndExpenditureRecord', 'getCategory']),
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    _pickStartTime(data) {
      this.startTime = data
      this._controlStartTimePicker()
      this._onRefresh()
    },
    _pickEndTime(data) {
      this.endTime = data
      this._controlEndTimePicker()
      this._onRefresh()
    },
    _onLoad() {
      // 异步更新数据
      this._incomeAndExpenditureRecord()
    },
    // 刷新列表
    _onRefresh() {
      this.incomeAndExpenditureRecord({
        page: 1,
        type: this.value1,
        store_id: this.value2,
        begin_time: this.startTimeLabel,
        end_time: this.endTimeLabel,
      }).then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
        this.finished = false
      })
    },
    // 明细分类
    _getCategory() {
      this.getCategory().then(res => {
        res.forEach(item => {
          item.text = item.label
        })
        this.option1 = res
      })
    },
    // 店铺列表
    _getStoreList() {
      this.getStoreList(1).then(res => {
        res.store_list.forEach(item => {
          item.text = item.label
        })
        this.option2 = res.store_list
      })
    },
    _incomeAndExpenditureRecord() {
      this.incomeAndExpenditureRecord({
        page: this.page,
        type: this.value1,
        store_id: this.value2,
        begin_time: this.startTimeLabel,
        end_time: this.endTimeLabel,
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
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  color: @font-gray-c;
  padding: 10px 16px;
}

.income {
  .van-panel__header-value {
    color: @green-c;
  }
}

.expenditure {
  .van-panel__header-value {
    color: @red-c;
  }
}

.desc {
  color: #333;
}

/deep/.maxWidth {
  max-width: 30vw;
}

/deep/.van-sticky {
  background-color: @gray-background-c;
}
</style>
