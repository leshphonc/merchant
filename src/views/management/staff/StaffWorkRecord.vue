<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="店员工作记录"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <div class="white-space"></div>
      <van-tabs @change="_changeRecord" type="card">
        <van-tab title="到岗记录"></van-tab>
        <van-tab title="开单记录"></van-tab>
        <van-tab title="服务记录">暂无记录</van-tab>
        <van-tab title="销售记录"></van-tab>
      </van-tabs>
      <div class="white-space"></div>
      <van-row justify="space-around" type="flex">
        <van-col span="7">
          <div @click="_controlStorePicker" class="filter-box">
            <div class="van-ellipsis">{{ storeLabel }}</div>
            <i class="iconfont">&#xe6f0;</i>
          </div>
        </van-col>
        <van-col span="7">
          <div @click="_controlStartTimePicker" class="filter-box">
            <div class="van-ellipsis">{{ startTimeLabel }}</div>
            <i class="iconfont">&#xe6f0;</i>
          </div>
        </van-col>
        <van-col span="7">
          <div @click="_controlEndTimePicker" class="filter-box">
            <div class="van-ellipsis">{{ endTimeLabel }}</div>
            <i class="iconfont">&#xe6f0;</i>
          </div>
        </van-col>
      </van-row>
    </van-sticky>
    <!-- 弹出层 -->
    <!-- 店铺选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStorePicker">
      <van-picker
        :columns="storeColumns"
        @cancel="_controlStorePicker"
        @confirm="_pickStore"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        :max-date="endTime"
        :value="startTime"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        type="date"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker
        :min-date="startTime"
        :value="endTime"
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        type="date"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'staffWorkRecord',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      showStorePicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      storeColumns: [],
      store_id: '',
      startTime: new Date(this.$moment().subtract(30, 'days')),
      endTime: new Date(),
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    storeLabel() {
      const item = this.storeColumns.find(item => item.value === this.store_id)
      return item && item.label
    },
    startTimeLabel() {
      return this.$moment(this.startTime).format('YYYY-MM-DD')
    },
    endTimeLabel() {
      return this.$moment(this.endTime).format('YYYY-MM-DD')
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getStoreList()
    this._staffArrivalRecord()
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('staff', ['staffArrivalRecord', 'staffBillingRecord', 'staffSalesRecord']),
    // 店铺选择开关
    _controlStorePicker() {
      this.showStorePicker = !this.showStorePicker
    },
    // 开始时间开关
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    // 结束时间开关
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    // 店铺选择
    _pickStore(data) {
      this.store_id = data.value
    },
    // 开始时间选择
    _pickStartTime(data) {
      this.startTime = data
    },
    // 结束时间选择
    _pickEndTime(data) {
      this.endTimeLabel = data
    },
    _changeRecord(data) {
      switch (data) {
        case 0:
          this._staffArrivalRecord()
          break
        case 1:
          this._staffBillingRecord()
          break
        case 2:
          this.list = []
          break
        case 3:
          this._staffSalesRecord()
          break
        default:
      }
    },
    // 获取店铺列表
    _getStoreList() {
      this.getStoreList(1).then(res => {
        this.storeColumns = res.store_list
      })
    },
    // 获取到岗记录
    _staffArrivalRecord() {
      const { id } = this.$route.params
      this.staffArrivalRecord({
        page: this.page,
        store_id: this.store_id,
        staff_id: id,
        begin_time: this.startTimeLabel,
        end_time: this.endTimeLabel,
      }).then(res => {
        this.list = res.list
      })
    },
    // 获取开单记录
    _staffBillingRecord() {
      const { id } = this.$route.params
      this.staffBillingRecord({
        page: this.page,
        store_id: this.store_id,
        staff_id: id,
        begin_time: this.startTimeLabel,
        end_time: this.endTimeLabel,
      }).then(res => {
        this.list = res.lists
      })
    },
    // 获取销售记录
    _staffSalesRecord() {
      const { id } = this.$route.params
      this.staffSalesRecord({
        page: this.page,
        store_id: this.store_id,
        staff_id: id,
        begin_time: this.startTimeLabel,
        end_time: this.endTimeLabel,
      }).then(res => {
        this.list = res.lists
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
