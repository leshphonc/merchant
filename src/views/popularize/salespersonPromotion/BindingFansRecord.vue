<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="绑粉记录"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div class="white-space"></div>
    <van-row type="flex">
      <van-col style="flex: 1; margin-left: 8px; min-width: 0;">
        <div @click="_controlStartTimePicker" class="filter-box">
          <div class="van-ellipsis">{{ startTimeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
      <van-col style="flex: 1;margin-left: 8px;margin-right: 8px; min-width: 0;">
        <div @click="_controlEndTimePicker" class="filter-box">
          <div class="van-ellipsis">{{ endTimeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
    </van-row>
    <van-divider>0条记录</van-divider>
    <!-- 弹出层 -->
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        :max-date="endTimeValue"
        :value="startTimeValue"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        type="date"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker
        :min-date="startTimeValue"
        :value="endTimeValue"
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        type="date"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'bindingFansRecord',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      startTimeValue: new Date(),
      endTimeValue: new Date(),
      showStartTimePicker: false,
      showEndTimePicker: false,
    }
  },

  computed: {
    startTimeLabel() {
      return this.$moment(this.startTimeValue).format('YYYY-MM-DD')
    },
    endTimeLabel() {
      return this.$moment(this.endTimeValue).format('YYYY-MM-DD')
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    _pickStartTime(data) {
      this.startTimeValue = data
      this._controlStartTimePicker()
    },
    _pickEndTime(data) {
      this.endTimeValue = data
      this._controlEndTimePicker()
    },
  },
}
</script>

<style lang="less" scoped></style>
