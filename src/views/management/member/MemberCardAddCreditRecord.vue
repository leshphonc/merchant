<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="会员卡充值记录"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <div :key="item.id" v-for="item in list">
          <van-panel :desc="item.phone" :status="item.desc" :title="item.nickname || '未知姓名'">
            <van-row align="center" type="flex">
              <van-col span="7">金额增加(元)：</van-col>
              <van-col span="5">{{ item.money_add }}</van-col>
              <van-col span="7">金额减少(元)：</van-col>
              <van-col span="5">{{ item.money_use }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row align="center" type="flex">
              <van-col span="7">金币增加(元)：</van-col>
              <van-col span="5">{{ item.score_add }}</van-col>
              <van-col span="7">金币减少(元)：</van-col>
              <van-col span="5">{{ item.score_use }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row align="center" type="flex">
              <van-col span="7">优惠券增加(元)：</van-col>
              <van-col span="5">{{ item.coupon_add }}</van-col>
              <van-col span="7">优惠券减少(元)：</van-col>
              <van-col span="5">{{ item.coupon_use }}</van-col>
            </van-row>
            <div class="white-space"></div>
            <van-row align="center" type="flex">
              <van-col span="7">操作时间：</van-col>
              <van-col class="time" span="12">{{ $moment(item.time * 1000).format('YYYY-MM-DD HH:mm') }}</van-col>
            </van-row>
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
  name: 'memberCardAddCreditRecord',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      refreshing: false,
      finished: false,
      loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('member', ['getMemberCardAddCreditRecord']),
    // 刷新领卡会员
    _onRefresh() {
      const { id } = this.$route.params
      this.getMemberCardAddCreditRecord({ id, page: 1 }).then(res => {
        this.page = 2
        this.list = res.list
        this.refreshing = false
        this.finished = false
      })
    },
    // 领卡会员加载
    _onLoad() {
      const { id } = this.$route.params
      this.getMemberCardAddCreditRecord({ id, page: this.page }).then(res => {
        this.loading = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.list)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}

.van-row {
  .van-col:nth-child(2) {
    color: @green-c;
  }
  .van-col:nth-child(4) {
    color: @red-c;
  }
}

.time {
  color: @font-gray-c !important;
}
</style>
