<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="推广数据统计"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-panel>
      <div>
        <van-row>
          <van-col span="5">播报语音：</van-col>
          <van-col span="19">{{ detail.read_txt }}</van-col>
        </van-row>
        <div class="white-space"></div>
      </div>
      <template #header>
        <van-row class="panel-row">
          <van-col span="6">
            <van-image :src="detail.ad_img ? detail.ad_img : detail.goods_info.goods_icon" />
          </van-col>
          <van-col span="12">
            <div>{{ detail.goods_info ? detail.goods_info.goods_name : '' }}</div>
            <div>{{ _currentDesc(detail) }}</div>
          </van-col>
          <van-col span="6">
            <div>{{ _currentStatus(detail) }}</div>
            <div>{{ detail.local_push === 1 ? '本店已推' : '本店未推' }}</div>
          </van-col>
        </van-row>
      </template>
    </van-panel>
    <van-row align="center" style="margin-top: 4px;" type="flex">
      <van-col style="flex: 1; margin: 0 8px; min-width: 0;">
        <div @click="_controlStorePicker" class="filter-box">
          <div class="van-ellipsis">{{ storeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
      <van-col style="flex: 1; margin: 0 8px; min-width: 0;">
        <div @click="_controlTimeTypePicker" class="filter-box">
          <div class="van-ellipsis">{{ timeTypeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
      <van-col style="flex: 1; margin: 0 8px; min-width: 0;">
        <div @click="_controlTimePicker" class="filter-box">
          <div class="van-ellipsis">{{ timeLabel }}</div>
          <i class="iconfont">&#xe6f0;</i>
        </div>
      </van-col>
    </van-row>
    <!-- <div style="display:flex;justify-content: flex-end;margin-top: 14px;">
      <van-tabs @change="_changeTab" type="card"  >
        <van-tab :disabled="loading" title="下单数"></van-tab>
        <van-tab :disabled="loading" title="扫码数"></van-tab>
        <van-tab :disabled="loading" title="触达数"></van-tab>
        <van-tab :disabled="loading" title="播报数"></van-tab>
      </van-tabs>
    </div>-->
    <v-chart :options="polar" autoresize ref="echart"></v-chart>
    <!-- 弹出层 -->
    <!-- 店铺筛选 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStorePicker">
      <van-picker
        :columns="storeAndScreenColumns"
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
import { mapActions } from 'vuex'
export default {
  name: 'smartScreenPromotionStatistics',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      loading: false,
      detail: {},
      orderData: [],
      scanData: [],
      reachData: [],
      detailsData: [],
      storeValue: '0',
      screenValue: '0',
      storeLabel: '全部店铺',
      timeTypeLabel: '日',
      timeTypeValue: '1',
      timeValue: new Date(),
      showStorePicker: false,
      showTimeTypePicker: false,
      showTimePicker: false,
      timeTypeColumns: [
        { label: '日', value: '1' },
        { label: '月', value: '2' },
        { label: '年', value: '3' },
      ],
      timeColumns: [],
      storeAndScreenColumns: [],
      echartType: '触达',
    }
  },

  computed: {
    // 生成x轴数据
    xData() {
      let xData = []
      if (this.timeTypeValue === '1') {
        xData = this.orderData.map((item, index) => `${(index + 1) * 2}点`)
      } else if (this.timeTypeValue === '2') {
        xData = this.orderData.map((item, index) => `${index + 1}号`)
      } else if (this.timeTypeValue === '3') {
        xData = this.orderData.map((item, index) => `${index + 1}月`)
      }
      return xData
    },
    // echart下单数据
    polar() {
      let format = null
      if (this.timeTypeValue === '1') {
        format = params => {
          const str = params[0].axisValue.substr(0, params[0].axisValue.length - 1)
          const result = `${str - 2}点 - ${str}点<br />
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
            params[0].color
          };"></span>${params[0].seriesName}: ${params[0].data}<br />
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
            params[1].color
          };"></span>${params[1].seriesName}: ${params[1].data}<br />
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
            params[2].color
          };"></span>${params[2].seriesName}: ${params[2].data}<br />
          <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
            params[3].color
          };"></span>${params[3].seriesName}: ${params[3].data}<br />
          `
          return result
        }
      }
      return {
        color: ['#F2995D', '#5793f3', '#d14a61', '#675bba'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
          formatter: format,
        },
        legend: {
          top: 20,
          data: ['下单人数', '扫码人数', '触达人数', '详情展示'],
        },
        grid: {
          top: '25%',
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
            // name: '人',
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
            name: '下单人数',
            type: 'line',
            data: this.orderData,
            // itemStyle: {
            //   barBorderRadius: [10000, 10000, 0, 0],
            // },
            // emphasis: {
            //   itemStyle: {
            //     color: '#D7834A',
            //   },
            // },
          },
          {
            name: '扫码人数',
            type: 'line',
            data: this.scanData,
            // itemStyle: {
            //   barBorderRadius: [10000, 10000, 0, 0],
            // },
            // emphasis: {
            //   itemStyle: {
            //     color: '#D7834A',
            //   },
            // },
          },
          {
            name: '触达人数',
            type: 'line',
            data: this.reachData,
            // itemStyle: {
            //   barBorderRadius: [10000, 10000, 0, 0],
            // },
            // emphasis: {
            //   itemStyle: {
            //     color: '#D7834A',
            //   },
            // },
          },
          {
            name: '详情展示',
            type: 'line',
            data: this.detailsData,
            // itemStyle: {
            //   barBorderRadius: [10000, 10000, 0, 0],
            // },
            // emphasis: {
            //   itemStyle: {
            //     color: '#D7834A',
            //   },
            // },
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
    for (let i = 0; i < 20; i++) {
      this.timeColumns.push(2010 + i)
    }
    const { id } = this.$route.params
    id && this._getPosterDetail(id)
    this._getStoreAndScreen()
    this._getVisitsFaceEchartData()
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getPosterDetail', 'getStoreAndScreen', 'getPromotionStatistics']),
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
      if (data[1] == '全部') {
        this.storeLabel = data[0]
      } else {
        this.storeLabel = data[1]
      }
      let store = this.storeAndScreenColumns.find(item => {
        if (item.label === data[0]) {
          return item
        }
      })
      this.storeValue = store.value
      let screen = store.children.find(item => {
        if (item.label === data[1]) {
          return item
        }
      })
      this.screenValue = screen.value
      // this.storeValue = data.value
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
    _getPosterDetail(id) {
      this.getPosterDetail(id).then(res => {
        this.detail = res
      })
    },
    _currentStatus(item) {
      if (item.is_shelves === '2') {
        if (item.audit === '9') {
          return '未上架同城'
        } else if (item.audit === '3') {
          return '同城审核失败'
        } else if (item.audit === '2') {
          return '未发布同城'
        } else {
          return '未上架同城'
        }
      } else if (item.audit === '1') {
        return '已发布同城'
      } else if (item.audit === '2') {
        return '同城审核中'
      }
    },
    _currentDesc(item) {
      let str = ''
      if (item.data_type === '0') {
        str = '海报'
      } else {
        switch (item.goods_type) {
          case '0':
            str = '零售商品'
            break
          case '1':
            str = '团购商品'
            break
          case '2':
            str = '服务商品'
            break
          // case '3':
          //   str = '次卡'
          //   break
          case '4':
            str = '套餐商品'
            break
          default:
            break
        }
      }
      return str
    },
    _getVisitsFaceEchartData() {
      if (this.loading) return
      this.loading = true
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '正在拉取数据...',
      })
      this.getPromotionStatistics({
        store_id: this.storeValue,
        device_id: this.screenValue,
        date_type: this.timeTypeValue,
        date: this.timeLabel,
        ad_id: this.$route.params.id,
      })
        .then(res => {
          toast.clear()
          this.loading = false
          this.orderData = res.order
          this.scanData = res.scan
          this.reachData = res.reach
          this.detailsData = res.details
        })
        .catch(() => {
          toast.clear()
          this.loading = false
        })
    },
    // 获取绑定了屏幕的店铺列表
    _getStoreAndScreen() {
      this.getStoreAndScreen({ ad_id: this.$route.params.id }).then(res => {
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
    // _changeTab(name, title) {
    //   if (name === 0) {
    //     this._getVisitsFaceEchartData(0)
    //     this.echartType = '触达'
    //   } else {
    //     this._getVisitsFaceEchartData(1)
    //     this.echartType = '播报'
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
.panel-row {
  padding: 10px 16px;
  .van-col:nth-child(2) {
    padding-left: 10px;
    div:nth-child(1) {
      font-size: 14px;
      color: @black-light-c;
    }
    div:nth-child(2) {
      color: @gray-deep-c;
      font-size: 12px;
      margin-top: 4px;
    }
  }
  .van-col:nth-child(3) {
    div:nth-child(1) {
      font-size: 14px;
      color: @red-c;
    }
    div:nth-child(2) {
      color: @gray-deep-c;
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}

.echarts {
  margin-top: 4px;
  background: #fff;
  width: 100%;
  height: 300px;
  z-index: 1;
}

/deep/.van-tabs__nav--card {
  height: 6vw;
}

/deep/.van-tabs__nav--card .van-tab {
  line-height: 6vw;
  font-size: 12px;
}
</style>
