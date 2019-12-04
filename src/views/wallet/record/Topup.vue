<template>
  <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
    <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
      <div :key="item.id" v-for="item in list">
        <van-panel :desc="item.order_id" :status="`¥ +${item.money}`" :title="item.desc">
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
  name: 'topup',

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
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    window.scroll(0, 0)
  },

  destroyed() {},

  methods: {
    ...mapActions('wallet', ['topupRecord']),
    _onLoad() {
      // 异步更新数据
      this.topupRecord(this.page).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    // 刷新列表
    _onRefresh() {
      this.topupRecord().then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
        this.finished = false
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__header-value {
  color: @green-c;
}

.van-panel__content {
  color: @font-gray-c;
  padding: 10px 16px;
}
</style>
