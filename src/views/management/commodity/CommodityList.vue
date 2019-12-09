<template>
  <div>
    <van-nav-bar
      :right-text="$route.fullPath === '/commodity' ? rightText : ''"
      :title="$route.fullPath === '/commodity' ? '商品管理' : '推广分佣管理'"
      @click-left="$goBack"
      @click-right="_createCommodity"
      fixed
      left-arrow
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" @change="_changeActiveTab" sticky v-model="activeTab">
      <van-tab title="电商">
        <e-commerce></e-commerce>
      </van-tab>
      <van-tab title="预定">
        <reserve></reserve>
      </van-tab>
      <van-tab title="团购">
        <group-buy></group-buy>
      </van-tab>
      <!-- <van-tab title="外卖"> -->
      <!-- <take-away-commodity></take-away-commodity> -->
      <!-- </van-tab> -->
      <van-tab title="服务">
        <service></service>
      </van-tab>
      <van-tab title="套餐">
        <package></package>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ECommerce from './ECommerce'
import Reserve from './Reserve'
import GroupBuy from './GroupBuy'
// import TakeAway from './TakeAway'
import Service from './Service'
import Package from './Package'

export default {
  name: 'commodityList',

  mixins: [],

  components: {
    ECommerce,
    Reserve,
    GroupBuy,
    // TakeAway,
    Service,
    Package,
  },

  props: {},

  data() {
    return {}
  },

  computed: {
    ...mapState('commodity', ['navText', 'activeTab']),
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    // 根据当前tab的index获得rightText
    rightText() {
      return this.navText[this.activeTab]
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {
    // 重置右上角文字
    this.resetRightText()
  },

  methods: {
    ...mapMutations('commodity', ['save', 'changeRightText', 'resetRightText']),
    _changeActiveTab(index) {
      this.save({
        activeTab: index,
      })
    },
    // 创建商品
    _createCommodity() {
      if (this.rightText === '创建') {
        switch (this.activeTab) {
          case 0:
            this.$router.push('/commodity/eCommerceCRU')
            break
          case 1:
            this.$router.push('/commodity/reserveCRU')
            break
          case 2:
            this.$router.push('/commodity/groupBuyCRU')
            break
          case 3:
            this.$router.push('/commodity/serviceCRU')
            break
          case 4:
            this.$router.push('/commodity/packageCRU')
            break
          default:
            break
        }
      } else {
        this.rightText === '管理'
          ? this.changeRightText({
              index: this.activeTab,
              text: '取消',
            })
          : this.changeRightText({
              index: this.activeTab,
              text: '管理',
            })
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
