<template>
  <div>
    <merchant-card></merchant-card>
    <div class="white-space"></div>
    <grid-map :data="mdata" size="48"></grid-map>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item :key="index" @click="_goAd(item.url)" v-for="(item, index) in swipe">
        <van-image :src="item.pic" style="vertical-align: bottom;"></van-image>
      </van-swipe-item>
    </van-swipe>
    <div class="white-space"></div>
    <div class="chart-box">
      <div class="chart-box-title">数据统计</div>
      <div class="wing-blank">
        <van-row :gutter="8" justify="center" type="flex">
          <van-col :key="index" @click="_changeType('row1', index)" style="flex: 1;" v-for="(item, index) in row1">
            <div :class="{ active: curType === item.type }" class="type-box">
              <div>{{ item.num }}</div>
              <div>{{ item.label }}</div>
            </div>
          </van-col>
        </van-row>
        <div class="white-space"></div>
        <van-row :gutter="8" justify="center" type="flex">
          <van-col :key="index" @click="_changeType('row2', index)" style="flex: 1;" v-for="(item, index) in row2">
            <div :class="{ active: curType === item.type }" class="type-box">
              <div>{{ item.num }}</div>
              <div>{{ item.label }}</div>
            </div>
          </van-col>
        </van-row>
        <div class="white-space"></div>
        <div class="white-space"></div>
        <van-row type="flex">
          <van-col style="flex: 1; min-width: 0;">
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
      </div>
      <div class="white-space"></div>
      <div class="white-space"></div>
      <v-chart :options="polar" autoresize ref="echart"></v-chart>
      <div class="white-space"></div>
    </div>
    <div class="chart-box" v-if="showAI">
      <div class="chart-box-title">门店AI助手</div>
      <echart-for-AI :storeColumns="storeAndScreenColumns"></echart-for-AI>
    </div>
    <div class="white-space"></div>
    <grid-map :data="pdata"></grid-map>
    <div class="tab-bar-holder-sp"></div>

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
      <van-datetime-picker
        :formatter="$timeFormatter"
        :type="timeType"
        :value="timeValue"
        @cancel="_controlTimePicker"
        @confirm="_pickTime"
      />
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
import { mapState, mapActions } from 'vuex'
import { ManagementGrid, PopularizeGrid } from '@/common/grid'
import MerchantCard from '@/components/MerchantCard'
import GridMap from '@/components/GridMap'
import EchartForAI from './EchartForAI'

export default {
  name: 'home',

  mixins: [],

  components: {
    MerchantCard,
    GridMap,
    EchartForAI,
  },

  props: {},

  data() {
    return {
      mdata: ManagementGrid,
      pdata: PopularizeGrid,
      curType: 'income',
      row1: [
        {
          label: '收入总数',
          num: '0',
          type: 'income',
        },
        {
          label: '订单总数',
          num: '0',
          type: 'order',
        },
      ],
      row2: [
        {
          label: '粉丝人数',
          num: '0',
          type: 'fans',
        },
        {
          label: '访问人数',
          num: '0',
          type: 'visitsPerson',
        },
        {
          label: '访问次数',
          num: '0',
          type: 'visitsNum',
        },
      ],
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
      storeColumns: [],
      storeAndScreenColumns: [],
      timeTypeColumns: [
        { label: '日', value: '1' },
        { label: '月', value: '2' },
        { label: '年', value: '3' },
      ],
      timeColumns: [],
      showAI: false,
    }
  },

  computed: {
    ...mapState('home', ['swipe', 'total_earn', 'total_fans', 'total_order', 'total_visit', 'total_visit_num']),
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

  watch: {
    total_earn() {
      this.row1[0].num = this.total_earn
      this.row1[1].num = this.total_order
      this.row2[0].num = this.total_fans
      this.row2[1].num = this.total_visit
      this.row2[2].num = this.total_visit_num
    },
  },

  created() {},

  mounted() {
    this.getSmartScreenList().then(res => {
      if (res.length) this.showAI = true
    })
    this._getStoreList()
    this._getStoreAndScreen()
    this.$refs.echart.showLoading()
    this.getIncomeEchartData({
      store_id: this.storeValue,
      date_type: this.timeTypeValue,
      date: this.timeLabel,
    }).then(res => {
      this.echartData = res
      this.$refs.echart.hideLoading()
    })
    for (let i = 0; i < 20; i++) {
      this.timeColumns.push(2010 + i)
    }
    this.row1[0].num = this.total_earn
    this.row1[1].num = this.total_order
    this.row2[0].num = this.total_fans
    this.row2[1].num = this.total_visit
    this.row2[2].num = this.total_visit_num
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('smartScreen', ['getSmartScreenList', 'getStoreAndScreen']),
    ...mapActions('home', [
      'getIncomeEchartData',
      'getOrderEchartData',
      'getFansEchartData',
      'getVisitsPersonEchartData',
      'getVisitsNumEchartData',
    ]),
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
      this._getEchartData(this.curType)
      this._controlStorePicker()
    },
    // 时间类型选择
    _pickTimeType(data) {
      this.timeTypeLabel = data.label
      this.timeTypeValue = data.value
      this._getEchartData(this.curType)
      this._controlTimeTypePicker()
    },
    // 时间选择
    _pickTime(data) {
      this.timeValue = data
      this._getEchartData(this.curType)
      this._controlTimePicker()
    },
    // 年份选择
    _pickYear(data) {
      this.timeValue = new Date().setYear(data)
      this._getEchartData(this.curType)
      this._controlTimePicker()
    },
    // 店铺列表
    _getStoreList(picker, value, index) {
      this.getStoreList(1).then(res => {
        this.storeColumns = res.store_list
      })
    },
    // 获取绑定了屏幕的店铺列表
    _getStoreAndScreen() {
      this.getStoreAndScreen().then(res => {
        this.storeAndScreenColumns = res.map(item => {
          return {
            label: item.name,
            value: item.id,
            children: [
              { label: '全部', value: 0 },
              ...item.devices.map(d => {
                return {
                  label: d.imax_name,
                  value: d.id,
                }
              }),
            ],
          }
        })
      })
    },
    // 跳转广告页面
    _goAd(url) {
      if (url === 'http://cs.7youke.com/wap.php?g=Wap&c=merchant&a=joinSubPlat') {
        this.$router.push('/joinThePlatform')
        return
      }
      window.location.href = url
    },
    // echart数据切换
    _changeType(row, index) {
      this.curType = this[row][index].type
      this._getEchartData(this[row][index].type)
    },
    _getEchartData(curType) {
      const obj = { store_id: this.storeValue, date_type: this.timeTypeValue, date: this.timeLabel }
      this.$refs.echart.showLoading()
      switch (curType) {
        case 'income':
          this.getIncomeEchartData(obj).then(res => {
            this.echartData = res
            this.seriesLabel = '收入'
            this.$refs.echart.hideLoading()
          })
          break
        case 'order':
          this.getOrderEchartData(obj).then(res => {
            this.echartData = res
            this.seriesLabel = '订单'
            this.$refs.echart.hideLoading()
          })
          break
        case 'fans':
          this.getFansEchartData(obj).then(res => {
            this.echartData = res
            this.seriesLabel = '新增粉丝'
            this.$refs.echart.hideLoading()
          })
          break
        case 'visitsPerson':
          this.getVisitsPersonEchartData(obj).then(res => {
            this.echartData = res
            this.seriesLabel = '新增人数'
            this.$refs.echart.hideLoading()
          })
          break
        case 'visitsNum':
          this.getVisitsNumEchartData(obj).then(res => {
            this.echartData = res
            this.seriesLabel = '访问次数'
            this.$refs.echart.hideLoading()
          })
          break
        default:
      }
    },
  },
}
</script>

<style lang="less" scoped>
.chart-box {
  overflow: hidden;
  background-color: #fff;
  &-title {
    font-size: 18px;
    margin: 14px;
  }
}

.type-box {
  background-color: @gray-light-c;
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  box-sizing: border-box;
  border: 2px solid @gray-light-c;

  & > div:first-child {
    font-size: 20px;
  }

  & > div:last-child {
    color: #888;
    font-size: 12px;
    margin-top: 3px;
  }
}

.active {
  border: 2px solid @primary-c;
}

.echarts {
  width: 100%;
  height: 180px;
  z-index: 1;
}
</style>
