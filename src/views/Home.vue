<template>
  <div>
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item :key="index" @click="_goAd(item.url)" v-for="(item, index) in swipe">
        <van-image :src="item.pic" style="vertical-align: bottom;"></van-image>
      </van-swipe-item>
    </van-swipe>
    <merchant-card></merchant-card>
    <div class="white-space"></div>
    <div class="wing-blank">
      <div class="card-panel">
        <grid-map :data="mdata" size="45"></grid-map>
        <v-chart :options="polar" autoresize></v-chart>
      </div>
    </div>
    <div class="white-space"></div>
    <div class="wing-blank" style="margin-bottom: ">
      <div class="card-panel">
        <grid-map :data="pdata"></grid-map>
      </div>
    </div>
    <div class="tab-bar-holder-sp"></div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
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
        color: ['#ffb000'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            crossStyle: {
              color: '#999',
            },
          },
        },
        grid: {
          top: 10,
          bottom: 30,
          right: 0,
          left: '13%',
        },
        xAxis: [
          {
            type: 'category',
            data: [12, 3, 4, 5, 6, 7, 3, 2, 3, 4],
            axisPointer: {
              type: 'shadow',
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            name: '元',
          },
        ],
        series: [
          {
            name: 'seriesLabel',
            type: 'bar',
            data: [12, 3, 4, 5, 6, 7, 3, 2, 3, 4],
          },
        ],
      },
    }
  },

  computed: {
    ...mapState('home', ['commonInfo']),
    swipe() {
      return this.commonInfo.wap_MerchantAd
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getHomeInfo()
  },

  destroyed() {},

  methods: {
    ...mapActions('home', ['getHomeInfo']),
    _goAd(url) {
      window.location.href = url
    },
  },
}
</script>

<style lang="less" scoped>
.echarts {
  width: 310px;
  height: 180px;
}
</style>
