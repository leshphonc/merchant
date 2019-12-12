<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="智能屏销售列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <div class="white-space"></div>
      <time-picker-box :pickEndTime="_pickEndTime" :pickStartTime="_pickStartTime"></time-picker-box>
      <div class="white-space"></div>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="index" v-for="(item, index) in list">123</div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePickerBox from '@/components/TimePickerBox'

export default {
  name: 'smartScreenSalesRecord',

  mixins: [],

  components: {
    TimePickerBox,
  },

  props: {},

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
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
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
    ...mapActions('smartScreen', ['getSmartScreenSalesRecord']),
    _pickStartTime(data) {
      this.startTime = this.$moment(data).format('YYYY-MM-DD')
      this._onRefresh()
    },
    _pickEndTime(data) {
      this.endTime = this.$moment(data).format('YYYY-MM-DD')
      this._onRefresh()
    },
    // 刷新列表
    _onRefresh() {
      const { imax } = this.$route.params
      this.getSmartScreenSalesRecord({
        page: 1,
        id: imax,
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
      const { imax } = this.$route.params
      this.getSmartScreenSalesRecord({
        page: this.page,
        id: imax,
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
  },
}
</script>

<style lang="less" scoped>
.van-sticky {
  background-color: @gray-background-c;
}
</style>
