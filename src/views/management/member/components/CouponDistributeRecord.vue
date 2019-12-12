<template>
  <div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="index" v-for="(item, index) in list">
          <van-panel
            :desc="$moment(item.add_time * 1000).format('YYYY-MM-DD HH:mm')"
            :status="item.msg"
            :title="item.coupon_name || '未知优惠券'"
          >
            <div>派发对象：{{ item.nickname || '未知用户' }}</div>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'couponDistributeRecord',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      refreshing: false,
      finished: false,
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('member', ['getCouponDistributeRecord']),
    // 刷新电商商品列表
    _onRefresh() {
      this.getCouponDistributeRecord().then(res => {
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
    // 异步更新电商商品数据
    _onLoad() {
      this.getCouponDistributeRecord(this.page).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  padding: 4px 16px;
  font-size: 14px;
  color: @black-c;
}
</style>
