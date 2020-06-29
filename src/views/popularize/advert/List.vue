<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="智能屏广告订单"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <div :key="index" v-for="(item, index) in list">
          <van-panel
            :desc="`¥${item.order_money} ${item.order_days}天`"
            :icon="item.ad_img"
            :status="item.status"
            :title="item.ad_name"
          >
            <div class="info-desc">
              <div>订单号：{{ item.id }}</div>
              <div>卖家名称：{{ item.mer_name || '暂无' }}</div>
              <div>卖家地址：{{ item.address || '暂无' }}</div>
              <div>屏幕地址：{{ item.province_name + item.city_name + item.area_name + item.circle_name + item.market_name + item.address }}</div>
              <div>购买时间：{{ $moment(item.buy_time * 1000).format('YYYY-MM-DD HH:mm:ss') }}</div>
              <div>请购日期：{{ item.start_time }} - {{ item.end_time }}</div>
            </div>
            <!-- <template #footer v-if="item.is_status">
              <van-button size="small" type="danger">取消订单</van-button>
              <van-button size="small" type="danger" v-if="item.paid === '0'">去付款</van-button>
              <van-button
                size="small"
                v-if="item.status === '待确认' || item.status === '已确认' || item.status === '末付款'"
              >修改内容</van-button>
            </template>
            <template #footer v-else-if="item.status === '待确认' || item.status === '已确认' || item.status === '末付款'">
              <van-button size="small">修改内容</van-button>
            </template>-->
            <template #footer>
              <van-button @click="_openPreView(item)" size="small" type="primary">查看环境图片</van-button>
            </template>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ImagePreview } from 'vant'

export default {
  name: 'advertList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      loading: false,
      refreshing: false,
      finished: false,
      list: [],
      page: 1,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('advert', ['getAdvertList']),
    _onRefresh() {
      this.getAdvertList({ page: 1 }).then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    _onLoad() {
      this.getAdvertList({
        page: this.page,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
    _openPreView(item) {
      let arr = []
      for (let i = 1; i <= 5; i++) {
        let name = 'pic' + i
        if (item[name]) {
          arr.push(item[name])
        }
      }
      if (arr.length) {
        ImagePreview(arr)
      } else {
        this.$toast('暂无环境图片')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-cell__left-icon {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}

.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
  overflow: auto;
}

.van-panel__footer {
  text-align: right;
}

.info-desc {
  div {
    margin: 2px 0;
  }
}
</style>
