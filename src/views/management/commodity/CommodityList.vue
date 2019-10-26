<template>
  <div>
    <van-nav-bar
      :border="false"
      :title="`商品列表`"
      @click-left="_goBack"
      @click-right="_createCommodity"
      fixed
      left-arrow
      right-text="创建"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky swipeable v-model="active">
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
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _createCommodity() {
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
    },
  },
}
</script>

<style lang="less" scoped></style>
