<template>
  <div>
    <van-sticky :offset-top="offsetTop">
      <van-dropdown-menu>
        <van-dropdown-item :options="storeColumns" @change="_changeOption" v-model="store_id" />
        <van-dropdown-item ref="item" title="时间筛选">
          <time-picker
            :data="[startTime, endTime]"
            :pickEndTime="_pickEndTime"
            :pickStartTime="_pickStartTime"
            endLabel="结束时间"
            showDefault
            startLabel="开始时间"
          ></time-picker>
          <van-button @click="_search" block type="primary">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
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
import TimePicker from '@/components/TimePicker'

export default {
  name: 'arrivalRecord',

  mixins: [],

  components: {
    TimePicker,
  },

  props: {
    storeColumns: {
      required: true,
      type: Array,
    },
  },

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
      store_id: '',
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : '暂无记录'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('staff', ['staffArrivalRecord']),

    _pickStartTime(data) {
      this.startTime = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEndTime(data) {
      this.endTime = this.$moment(data).format('YYYY-MM-DD')
    },
    _changeOption(data) {
      this.store = data
      this._onRefresh()
    },
    // 刷新商品列表
    _onRefresh() {
      const { id } = this.$route.params
      this.staffArrivalRecord({
        page: 1,
        store_id: this.store_id,
        staff_id: id,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.page = 2
        this.list = res.list
        this.refreshing = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新商品数据
    _onLoad() {
      const { id } = this.$route.params
      this.staffArrivalRecord({
        page: this.page,
        store_id: this.store_id,
        staff_id: id,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.loading = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.list)
      })
    },
    _search() {
      this._onRefresh()
      this.$refs.item.toggle()
    },
  },
}
</script>

<style lang="less" scoped></style>
