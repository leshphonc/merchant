<template>
  <div>
    <van-nav-bar
      :right-text="rightText"
      @click-left="$goBack"
      @click-right="_createCommodity"
      fixed
      left-arrow
      title="商品管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="电商">
        <e-commerce-commodity></e-commerce-commodity>
      </van-tab>
      <van-tab title="外卖">
        <take-away-commodity></take-away-commodity>
      </van-tab>
      <van-tab title="服务">
        <service-commodity></service-commodity>
      </van-tab>
      <van-tab title="套餐">
        <package-commodity></package-commodity>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ECommerceCommodity from './ECommerceCommodity'
import TakeAwayCommodity from './TakeAwayCommodity'
import ServiceCommodity from './ServiceCommodity'
import PackageCommodity from './PackageCommodity'

export default {
  name: 'commodityList',

  mixins: [],

  components: {
    ECommerceCommodity,
    TakeAwayCommodity,
    ServiceCommodity,
    PackageCommodity,
  },

  props: {},

  data() {
    return {
      active: 0,
      eCommerceActive: 0,
    }
  },

  computed: {
    ...mapState('commodity', ['navText']),
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    // 根据当前tab的index获得rightText
    rightText() {
      console.log(this.navText)
      return this.navText[this.active]
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
    ...mapMutations('commodity', ['changeRightText', 'resetRightText']),
    // 创建商品
    _createCommodity() {
      if (this.rightText === '创建') {
        switch (this.active) {
          case 0:
            this.$router.push('/commodity/eCommerceCommodityCRU')
            break
          case 1:
            this.$router.push('/commodity/eCommerceCommodityCRU')
            break
          case 2:
            this.$router.push('/commodity/serviceCommodityCRU')
            break
          case 3:
            this.$router.push('/commodity/packageCommodityCRU')
            break
          default:
            break
        }
      } else {
        this.rightText === '管理'
          ? this.changeRightText({
              index: this.active,
              text: '取消',
            })
          : this.changeRightText({
              index: this.active,
              text: '管理',
            })
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
