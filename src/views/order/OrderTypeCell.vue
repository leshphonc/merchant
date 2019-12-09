<template>
  <div>
    <van-nav-bar fixed left-text="所有订单"></van-nav-bar>
    <div class="nav-bar-holder-sp"></div>
    <div :key="index" v-for="(item, index) in list">
      <div class="white-space"></div>
      <van-cell-group>
        <van-cell :title="item.name" :to="item.url" :value="item.count" center is-link>
          <img :src="item.icon" alt slot="icon" />
        </van-cell>
      </van-cell-group>
    </div>
    <div class="tab-bar-holder-sp"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'orderTypeCell',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      map: {
        团购订单: '/order/groupBuyList',
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getOrderTypeList()
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['getOrderTypeList']),
    _getOrderTypeList() {
      this.getOrderTypeList().then(res => {
        res.push({ name: '到店消费订单', count: '0', icon: 'daodian' })
        res.forEach(item => {
          switch (item.icon) {
            case 'tuangou':
              item.url = '/order/groupBuyList'
              item.icon = require('@/assets/image/tuangou.png')
              break
            case 'yuding':
              item.url = '/order/reserveList'
              item.icon = require('@/assets/image/yuding.png')
              break
            case 'lingshou':
              item.url = '/order/takeAwayList'
              item.icon = require('@/assets/image/lingshou.png')
              break
            case 'waimai':
              item.url = '/order/takeAwayList'
              item.icon = require('@/assets/image/waimai.png')
              break
            case 'fuwu':
              item.url = '/order/serviceList'
              item.icon = require('@/assets/image/fuwu.png')
              break
            case 'taocan':
              item.url = '/order/packageList'
              item.icon = require('@/assets/image/taocan.png')
              break
            case 'dianshang':
              item.url = '/order/eCommerceList'
              item.icon = require('@/assets/image/dianshang.png')
              break
            case 'canyin':
              item.url = '/404'
              item.icon = require('@/assets/image/canyin.png')
              break
            case 'qipei':
              item.url = '/404'
              item.icon = require('@/assets/image/qipei.png')
              break
            case 'suguan':
              item.url = '/404'
              item.icon = require('@/assets/image/jiudian.png')
              break
            case 'huodong':
              item.url = '/404'
              item.icon = require('@/assets/image/huodong.png')
              break
            case 'daodian':
              item.url = '/404'
              item.icon = require('@/assets/image/arrival_shop.png')
              break
            default:
              item.url = '404'
          }
        })
        this.list = res
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  height: 54px;
  line-height: 54px;
  background-color: #fff;
  .van-nav-bar__text {
    color: #000;
    font-size: 24px;
  }
}
.van-cell {
  img {
    width: 32px;
    height: 32px;
    margin-right: 14px;
  }
}

.van-cell--clickable:active {
  background-color: @primary-c;
  color: #fff;

  .van-cell__value {
    color: #fff;
  }
  .van-cell__right-icon {
    color: #fff;
  }
}
</style>
