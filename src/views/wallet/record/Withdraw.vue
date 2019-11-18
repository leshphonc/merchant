<template>
  <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
    <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
      <div :key="item.id" v-for="item in list">
        <van-panel :desc="item.order_id" :status="`¥ ${item.money}`" :title="status[item.status].label">
          <div class="desc">{{ item.desc }}</div>
          <div class="white-space"></div>
          <div>备注：{{ item.remark }}</div>
          <div class="white-space"></div>
          <div>{{ item.withdraw_time }}</div>
        </van-panel>
        <div class="white-space"></div>
      </div>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'withdraw',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      status: {
        0: {
          label: '审核中',
          color: '#ffb000',
        },
        1: {
          label: '已通过',
          color: '#669900',
        },
        2: {
          label: '被驳回',
          color: '#dd4a68',
        },
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    window.scroll(0, 0)
    this._withdrawRecord()
  },

  destroyed() {},

  methods: {
    ...mapActions('wallet', ['withdrawRecord']),
    _onLoad() {
      // 异步更新数据
      this._withdrawRecord()
    },
    // 刷新列表
    _onRefresh() {
      this.withdrawRecord().then(res => {
        this.page = 1
        this.list = res.lists
        this.refreshing = false
      })
    },
    _withdrawRecord() {
      this.withdrawRecord(this.page).then(res => {
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

.desc {
  color: #333;
}
</style>
