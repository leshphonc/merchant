<template>
  <div>
    <van-row type="flex">
      <van-col style="flex: 1; margin-left: 8px; min-width: 0;">
        <div @click="_controlStorePicker" class="filter-box">
          <div class="van-ellipsis">{{ storeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
      <van-col style="flex: 1; margin-left: 8px; min-width: 0;">
        <div @click="_controlTimeTypePicker" class="filter-box">
          <div class="van-ellipsis">{{ timeTypeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
      <van-col style="flex: 1; margin-left: 8px; min-width: 0;">
        <div @click="_controlTimePicker" class="filter-box">
          <div class="van-ellipsis">{{ timeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
    </van-row>
    <div class="white-space"></div>
    <div class="white-space"></div>
    <v-chart :options="polar" autoresize ref="echart"></v-chart>
    <van-row class="row-box" justify="space-around" type="flex">
      <van-col span="11">广告订单</van-col>
      <van-col @click="_goScreen" span="11">推广内容</van-col>
    </van-row>
    <div class="white-space"></div>

    <!-- 弹出层 -->
    <!-- 店铺筛选 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStorePicker">
      <van-picker
        :columns="storeColumns"
        @cancel="_controlStorePicker"
        @confirm="_pickStore"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 日期类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTimeTypePicker">
      <van-picker
        :columns="timeTypeColumns"
        @cancel="_controlTimeTypePicker"
        @confirm="_pickTimeType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 日期新增 -->
    <van-popup position="bottom" safe-area-inset-bottom v-if="timeTypeValue !== '3'" v-model="showTimePicker">
      <van-datetime-picker :type="timeType" :value="timeValue" @cancel="_controlTimePicker" @confirm="_pickTime" />
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-if="timeTypeValue === '3'" v-model="showTimePicker">
      <van-picker
        :columns="timeColumns"
        :default-index="timeIndex"
        @cancel="_controlTimePicker"
        @confirm="_pickYear"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'echartForAI',

  mixins: [],

  components: {},

  props: {
    storeColumns: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      echartData: [],
      storeLabel: '全部店铺',
      storeValue: '',
      timeTypeLabel: '日',
      timeTypeValue: '1',
      timeValue: new Date(),
      seriesLabel: '收入',
      showStorePicker: false,
      showTimeTypePicker: false,
      showTimePicker: false,
      timeTypeColumns: [{ label: '日', value: '1' }, { label: '月', value: '2' }, { label: '年', value: '3' }],
      timeColumns: [],
    }
  },

  computed: {
    // 生成x轴数据
    xData() {
      let xData = []
      if (this.timeTypeValue === '1') {
        xData = this.echartData.map((item, index) => `${(index + 1) * 2}点`)
      } else if (this.timeTypeValue === '2') {
        xData = this.echartData.map((item, index) => `${index + 1}号`)
      } else if (this.timeTypeValue === '3') {
        xData = this.echartData.map((item, index) => `${index + 1}月`)
      }
      return xData
    },
    // echart数据
    polar() {
      let format = null
      if (this.timeTypeValue === '1') {
        format = params => {
          const str = params[0].axisValue.substr(0, params[0].axisValue.length - 1)
          const result = `${str - 2}点 - ${str}点<br />
        <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#00A29A;"></span>${
          params[0].seriesName
        }: ${params[0].data}`
          return result
        }
      }
      return {
        color: ['#86CACD'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: format,
        },
        grid: {
          top: 10,
          bottom: 30,
          right: 20,
          left: '13%',
        },
        xAxis: [
          {
            type: 'category',
            data: this.xData,
            axisLabel: {
              color: '#9E9E9E',
            },
            axisLine: {
              lineStyle: {
                color: '#DFDFDF',
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '元',
            axisLabel: {
              color: '#9E9E9E',
            },
            splitLine: {
              lineStyle: {
                color: ['#DFDFDF'],
              },
            },
            axisLine: {
              lineStyle: {
                color: '#DFDFDF',
              },
            },
            max: function(value) {
              return parseInt(value.max + 10)
            },
          },
        ],
        series: [
          {
            name: this.seriesLabel,
            type: 'bar',
            data: this.echartData,
            itemStyle: {
              barBorderRadius: [10000, 10000, 0, 0],
            },
            emphasis: {
              itemStyle: {
                color: '#00A29A',
              },
            },
          },
        ],
      }
    },
    timeIndex() {
      return this.timeColumns.findIndex(item => item === Number(this.$moment(this.timeValue).format('YYYY')))
    },
    timeLabel() {
      if (this.timeValue !== '') {
        if (this.timeTypeValue === '1') {
          return this.$moment(this.timeValue).format('YYYY-MM-DD')
        } else if (this.timeTypeValue === '2') {
          return this.$moment(this.timeValue).format('YYYY-MM')
        } else {
          return this.$moment(this.timeValue).format('YYYY')
        }
      } else {
        return this.$moment(new Date()).format('YYYY-MM-DD')
      }
    },
    timeType() {
      if (this.timeTypeValue === '1') {
        return 'date'
      } else if (this.timeTypeValue === '2') {
        return 'year-month'
      } else {
        return 'year'
      }
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getVisitsFaceEchartData()
    for (let i = 0; i < 20; i++) {
      this.timeColumns.push(2010 + i)
    }
  },

  destroyed() {},

  methods: {
    ...mapActions('home', ['getVisitsFaceEchartData']),
    // 店铺筛选开关
    _controlStorePicker() {
      this.showStorePicker = !this.showStorePicker
    },
    // 时间类型开关
    _controlTimeTypePicker() {
      this.showTimeTypePicker = !this.showTimeTypePicker
    },
    // 时间选择开关showTimePicker
    _controlTimePicker() {
      this.showTimePicker = !this.showTimePicker
    },
    // 店铺选择
    _pickStore(data) {
      this.storeLabel = data.label
      this.storeValue = data.value
      this._getVisitsFaceEchartData()
      this._controlStorePicker()
    },
    // 时间类型选择
    _pickTimeType(data) {
      this.timeTypeLabel = data.label
      this.timeTypeValue = data.value
      this._getVisitsFaceEchartData()
      this._controlTimeTypePicker()
    },
    // 时间选择
    _pickTime(data) {
      this.timeValue = data
      this._getVisitsFaceEchartData()
      this._controlTimePicker()
    },
    // 年份选择
    _pickYear(data) {
      this.timeValue = new Date().setYear(data)
      this._getVisitsFaceEchartData()
      this._controlTimePicker()
    },
    // 获取进店人数
    _getVisitsFaceEchartData() {
      const obj = { store_id: this.storeValue, date_type: this.timeTypeValue, date: this.timeLabel }
      this.getVisitsFaceEchartData(obj).then(res => {
        this.echartData = res
      })
    },
    _goScreen() {
      this.$router.push('/smartScreen')
    },
  },
}
</script>

<style lang="less" scoped>
.echarts {
  width: 100%;
  height: 180px;
  z-index: 1;
}

.row-box {
  .van-col {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-size: 12px;
    font-weight: 600;
    color: @gray-deep-c;
    background: @gray-light-c;
  }
}
</style>
