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
            <div :class="`type-box ${curType === item.type ? 'active' : ''}`">
              <div>{{ item.num }}</div>
              <div>{{ item.label }}</div>
            </div>
          </van-col>
        </van-row>
        <div class="white-space"></div>
        <van-row :gutter="8" justify="center" type="flex">
          <van-col :key="index" @click="_changeType('row2', index)" style="flex: 1;" v-for="(item, index) in row2">
            <div :class="`type-box ${curType === item.type ? 'active' : ''}`">
              <div>{{ item.num }}</div>
              <div>{{ item.label }}</div>
            </div>
          </van-col>
        </van-row>
        <div class="white-space"></div>
        <van-row type="flex">
          <van-col style="flex: 1; margin-left: 8px;">
            <div class="filter-box">
              全部店铺
              <i class="iconfont">&#xe6f0;</i>
            </div>
          </van-col>
          <van-col style="flex: 1; margin-left: 8px;">
            <div class="filter-box">
              日
              <i class="iconfont">&#xe6f0;</i>
            </div>
          </van-col>
          <van-col style="flex: 1; margin-left: 8px;">
            <div class="filter-box">
              2019-02-10
              <i class="iconfont">&#xe6f0;</i>
            </div>
          </van-col>
        </van-row>
      </div>
      <div class="white-space"></div>
      <div class="white-space"></div>
      <v-chart :options="polar" autoresize></v-chart>
      <div class="white-space"></div>
    </div>
    <div class="white-space"></div>

    <grid-map :data="pdata"></grid-map>
    <div class="tab-bar-holder-sp"></div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { ManagementGrid, PopularizeGrid } from '@/common/grid'
import MerchantCard from '@/components/MerchantCard'
import GridMap from '@/components/GridMap'

export default {
  name: 'home',

  mixins: [],

  components: {
    MerchantCard,
    GridMap,
  },

  props: {},

  data() {
    return {
      active: 0,
      icons: {
        home: {
          active: require('@/assets/image/home.png'),
          unactive: require('@/assets/image/home_gray.png'),
        },
        order: {
          active: require('@/assets/image/order.png'),
          unactive: require('@/assets/image/order_gray.png'),
        },
        marketing: {
          active: require('@/assets/image/marketing.png'),
          unactive: require('@/assets/image/marketing_gray.png'),
        },
        mine: {
          active: require('@/assets/image/mine.png'),
          unactive: require('@/assets/image/mine_gray.png'),
        },
      },
      mdata: ManagementGrid,
      pdata: PopularizeGrid,
      polar: {
        color: ['#86CACD'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'none',
          },
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
            data: [1, 2, 3, 4],
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
            name: 'seriesLabel',
            type: 'bar',
            data: [1, 2, 3, 4],
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
      },
      swipe: [],
      curType: 'income',
      row1: [
        {
          label: '收入总数',
          num: '12442',
          type: 'income',
        },
        {
          label: '订单总数',
          num: '12442',
          type: 'order',
        },
      ],
      row2: [
        {
          label: '粉丝人数',
          num: '12442',
          type: 'fans',
        },
        {
          label: '访问人数',
          num: '12442',
          type: 'visitsPerson',
        },
        {
          label: '访问次数',
          num: '12442',
          type: 'visits',
        },
      ],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getHomeInfo()
  },

  destroyed() {},

  methods: {
    ...mapActions('home', ['getHomeInfo']),
    // 读取首页轮播广告
    _getHomeInfo() {
      this.getHomeInfo().then(res => {
        console.log(res)
        this.swipe = res.wap_MerchantAd
        sessionStorage.setItem('merchant-balance', res.allmoney)
      })
    },
    // 跳转广告页面
    _goAd(url) {
      window.location.href = url
    },
    _changeType(row, index) {
      this.curType = this[row][index].type
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
}
</style>
