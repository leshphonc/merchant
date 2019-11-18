<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="红包领取记录"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-panel :title="`红包总金额：${total} 元`">
        <div class="content">
          <van-row>
            <van-col span="11">已领取：{{ received }}</van-col>
            <van-col offset="1">剩余：{{ remaining }}</van-col>
          </van-row>
          <van-row>
            <van-col span="11">已领人数：{{ receivedPerson }}</van-col>
            <van-col offset="1">浏览次数：{{ browse }}</van-col>
          </van-row>
        </div>
      </van-panel>
      <div class="white-space"></div>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <van-card :key="item.id" :thumb="item.avatar" :title="item.nickname" lazy-load v-for="item in list">
          <div slot="desc">
            <div>领取金额：{{ item.prize_name }}</div>
            <div>领取时间：{{ $moment(item.add_time * 1000).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'redEnvelopeReceivingRecord',

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
      total: '',
      received: '',
      remaining: '',
      receivedPerson: '',
      browse: '',
    }
  },

  computed: {
    finishText() {
      return ''
    },
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('redEnvelope', ['getRedEnvelopeReceivingRecord']),
    // 加载更多
    _onLoad() {
      const { id } = this.$route.params
      this.getRedEnvelopeReceivingRecord({ id, page: this.page }).then(res => {
        this.loading = false
        this.total = res.total_money
        this.received = res.used_money
        this.remaining = res.left_money
        this.receivedPerson = res.person_num
        this.browse = res.read_num
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
      const { id } = this.$route.params
      this.getRedEnvelopeReceivingRecord({ id, page: 1 }).then(res => {
        this.page = 1
        this.list = res.lists
        this.refreshing = false
      })
    },
  },
}
</script>

<style lang="less" scoped>
.content {
  color: @font-gray-c;
  padding: 2px 16px;
  font-size: 12px;
}
</style>
