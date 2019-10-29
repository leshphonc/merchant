<template>
  <div>
    <van-nav-bar
      :border="false"
      :right-text="rightText"
      :title="`商品列表`"
      @click-left="_goBack"
      @click-right="_createCommodity"
      fixed
      left-arrow
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="电商">
        <e-commerce-commodity></e-commerce-commodity>
      </van-tab>
      <van-tab title="外卖">内容 2</van-tab>
      <van-tab title="服务">内容 3</van-tab>
      <van-tab title="套餐">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import ECommerceCommodity from './ECommerceCommodity'

export default {
  name: 'commodityList',

  mixins: [],

  components: {
    ECommerceCommodity,
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

  destroyed() {},

  methods: {
    ...mapMutations('commodity', ['changeRightText']),
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
            this.$router.push('/commodity/eCommerceCommodityCRU')
            break
          case 3:
            this.$router.push('/commodity/eCommerceCommodityCRU')
            break
          default:
            break
        }
      } else {
        if (this.active === 0) {
          this.rightText === '管理'
            ? this.changeRightText({
                index: 0,
                text: '取消',
              })
            : this.changeRightText({
                index: 0,
                text: '管理',
              })
        }
      }
    },
  },
}
</script>

<style lang="less" scoped></style>
