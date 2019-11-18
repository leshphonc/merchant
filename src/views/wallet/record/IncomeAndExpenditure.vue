<template>
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
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    window.scroll(0, 0)
    this._incomeAndExpenditureRecord()
  },

  destroyed() {},

  methods: {
    ...mapActions('wallet', ['incomeAndExpenditureRecord']),
    _onLoad() {
      // 异步更新数据
      this._incomeAndExpenditureRecord()
    },
    // 刷新列表
    _onRefresh() {
      this.incomeAndExpenditureRecord().then(res => {
        this.page = 1
        this.list = res.lists
        this.refreshing = false
      })
    },
    _incomeAndExpenditureRecord() {
      this.incomeAndExpenditureRecord(this.page).then(res => {
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
</style>
