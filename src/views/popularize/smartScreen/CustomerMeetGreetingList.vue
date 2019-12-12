<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_createMeetGreeting"
      fixed
      left-arrow
      right-text="创建"
      title="顾客见面语"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-swipe-cell
          :key="index"
          :on-close="(clickPosition, instance) => _deleteMeetGreeting(clickPosition, instance, item.id)"
          v-for="(item, index) in list"
        >
          <van-cell
            :label="item.context"
            :title="item.title"
            @click="_modifyMeetGreeting(item.id)"
            center
            is-link
            value="修改"
          />
          <template slot="right">
            <van-button square text="删除" type="danger" />
          </template>
        </van-swipe-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'customerMeetGreetingList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
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
    ...mapActions('smartScreen', ['getMeetGreetingList', 'deleteMeetGreeting']),
    // 刷新列表
    _onRefresh() {
      const { imax } = this.$route.params
      this.getMeetGreetingList({
        imax_id: imax,
        page: 1,
        type: 1,
      }).then(res => {
        this.page = 2
        this.list = res.data
        this.refreshing = false
        if (res.data.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新数据
    _onLoad() {
      const { imax } = this.$route.params
      this.getMeetGreetingList({
        imax_id: imax,
        page: this.page,
        type: 1,
      }).then(res => {
        this.loading = false
        if (res.data.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.data)
      })
    },
    _createMeetGreeting() {
      const { imax } = this.$route.params
      this.$router.push(`/smartScreen/customerMeetGreetingCRU/${imax}`)
    },
    _modifyMeetGreeting(id) {
      const { imax } = this.$route.params
      this.$router.push(`/smartScreen/customerMeetGreetingCRU/${imax}/${id}`)
    },
    _deleteMeetGreeting(clickPosition, instance, id) {
      switch (clickPosition) {
        case 'outside':
          instance.close()
          break
        case 'right':
          if (this.loading) return
          this.loading = true
          this.$dialog
            .confirm({
              message: '确定删除吗？',
            })
            .then(() => {
              this.deleteMeetGreeting(id).then(res => {
                this.$toast.success({
                  message: '操作成功',
                  forbidClick: true,
                  duration: 1000,
                })
                instance.close()
                this._onRefresh()
                this.loading = false
              })
            })
          break
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-swipe-cell__right {
  .van-button {
    height: 100%;
  }
}
</style>
