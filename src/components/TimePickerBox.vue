<template>
  <div>
    <van-row align="center" type="flex">
      <van-col style="flex: 1; margin: 0 8px; min-width: 0;">
        <div @click="_controlStartTimePicker" class="filter-box">
          <div class="van-ellipsis">{{ startTimeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
      <span class="sp-line">-</span>
      <van-col style="flex: 1; margin: 0 8px; min-width: 0;">
        <div @click="_controlEndTimePicker" class="filter-box">
          <div class="van-ellipsis">{{ endTimeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
    </van-row>
    <!-- 弹出层 -->
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        :max-date="endTime"
        :value="startTime"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        show-toolbar
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
        show-toolbar
        type="date"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'timePickerBox',

  mixins: [],

  components: {},

  props: {
    pickStartTime: {
      type: Function,
      required: true,
    },
    pickEndTime: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      startTime: new Date(this.$moment().subtract(30, 'days')),
      endTime: new Date(),
      showStartTimePicker: false,
      showEndTimePicker: false,
    }
  },

  computed: {
    startTimeLabel() {
      return this.$moment(this.startTime).format('YYYY-MM-DD')
    },
    endTimeLabel() {
      return this.$moment(this.endTime).format('YYYY-MM-DD')
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
      this.startTime = data
      this._controlStartTimePicker()
      this.pickStartTime(data)
    },
    _pickEndTime(data) {
      this.endTime = data
      this._controlEndTimePicker()
      this.pickEndTime(data)
    },
  },
}
</script>

<style lang="less" scoped></style>
