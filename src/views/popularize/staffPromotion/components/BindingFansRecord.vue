<template>
  <div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-panel
          :desc="$moment(item.spread_time * 1000).format('YYYY-MM-DD HH:mm')"
          :icon="item.avatar"
          :key="index"
          :title="item.nickname || '未知'"
          v-for="(item, index) in list"
        ></van-panel>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'bindingFansRecord',

  mixins: [],

  components: {},

  props: {
    id: String,
  },

  data() {
    return {
      list: [],
      page: 1,
      refreshing: false,
      finished: false,
      loading: false,
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
    ...mapActions('staffPromotion', ['getBindingFansRecord']),
    // 刷新列表
    _onRefresh() {
      const { id, stime, etime } = this.$route.params
      this.getBindingFansRecord({
        page: 1,
        starttime: stime,
        endtime: etime,
        id,
      }).then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
        this.finished = false
      })
    },
    // 异步更新数据
    _onLoad() {
      const { id, stime, etime } = this.$route.params
      this.getBindingFansRecord({
        page: this.page,
        starttime: stime,
        endtime: etime,
        id,
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
.van-icon__image {
  width: 16vw;
  height: 12vw;
}
</style>
