<!--
  功能：开始时间，结束时间组件（验证非空）
  作者：cc
  时间：2019年11月20日
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
  备注：  暂不支持验证可选，需要包在ValidationObserver内使用
  props：
    startTimeLabel<String>：开始时间label
    endTimeLabel<String>：结束时间label
    data<Object>：默认时间
    pickStartTime<Function>：返回选中的开始时间到父组件
    pickEndTime<Function>：返回选中的结束时间到父组件
-->
<template>
  <div>
    <ValidationProvider :name="startField" rules="required" slim v-slot="{ errors }">
      <van-field
        :error-message="errors[0]"
        :label="startLabel"
        :value="startTimeLabel"
        @click="_controlStartTimePicker"
        error-message-align="right"
        input-align="right"
        is-link
        placeholder="选择开始时间"
        readonly
        required
      ></van-field>
    </ValidationProvider>
    <ValidationProvider :name="endField" rules="required" slim v-slot="{ errors }">
      <van-field
        :error-message="errors[0]"
        :label="endLabel"
        :value="endTimeLabel"
        @click="_controlEndTimePicker"
        error-message-align="right"
        input-align="right"
        is-link
        placeholder="选择结束时间"
        readonly
        required
      ></van-field>
    </ValidationProvider>
    <!-- 弹出层 -->
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        :max-date="endTime"
        :type="type"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        v-model="startTime"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker
        :min-date="startTime"
        :type="type"
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        v-model="endTime"
      />
    </van-popup>
  </div>
</template>

<script>
export default {
  name: 'timePicker',

  mixins: [],

  components: {},

  props: {
    startLabel: {
      type: String,
      required: true,
    },
    startField: String,
    endLabel: String,
    endField: String,
    data: Array,
    type: {
      type: String,
      default: 'date',
    },
    pickStartTime: {
      type: Function,
      required: true,
    },
    pickEndTime: Function,
  },

  data() {
    return {
      showStartTimePicker: false,
      showEndTimePicker: false,
      startTime: new Date(this.$moment().subtract(30, 'days')),
      endTime: new Date(),
    }
  },

  computed: {
    // 开始时间非空验证
    startTimeLabel() {
      return this.$moment(this.startTime).format('YYYY-MM-DD')
    },
    // 结束时间非空验证
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
      this.pickStartTime(data)
      this._controlStartTimePicker()
    },
    _pickEndTime(data) {
      this.pickEndTime(data)
      this._controlEndTimePicker()
    },
  },
}
</script>

<style lang="less" scoped></style>
