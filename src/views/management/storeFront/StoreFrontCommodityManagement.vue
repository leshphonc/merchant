<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_controlCommodityPopup"
      fixed
      left-arrow
      right-text="添加"
      title="店铺管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="电商">
        <e-commerce-list></e-commerce-list>
      </van-tab>
      <van-tab title="服务">
        <service-list></service-list>
      </van-tab>
      <van-tab title="套餐">
        <package-list></package-list>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- 绑定产品列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCommodityPopup">
      <!-- <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-card
          :key="item.goods_id"
          :num="item.stock_num === '-1' ? '∞' : item.stock_num - item.sell_count"
          :origin-price="item.old_price"
          :price="item.price"
          :tag="item.statusstr"
          :thumb="item.list_pic"
          :title="item.s_name"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <van-tag plain type="danger">{{ item.freight_type === '1' ? '运费单独计算' : '运费最大值' }}</van-tag>
          </div>
        </van-card>
      </van-list> -->
    </van-popup>
  </div>
</template>

<script>
import ECommerceList from './components/ECommerceList'
import ServiceList from './components/ServiceList'
import PackageList from './components/PackageList'

export default {
  name: 'storeFrontCommodityManagement',

  mixins: [],

  components: {
    ECommerceList,
    ServiceList,
    PackageList,
  },

  props: {},

  data() {
    return {
      active: 0,
      showCommodityPopup: false,
      finished: false,
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    finishText() {
      return this.list.length ? '没有更多了' : '暂无商品'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _controlCommodityPopup() {
      this.showCommodityPopup = !this.showCommodityPopup
    },
    _onLoad() {
      const { id } = this.$route.params
      this.getStoreFrontBindECommerceList({
        store_id: id,
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
  },
}
</script>

<style lang="less" scoped></style>
