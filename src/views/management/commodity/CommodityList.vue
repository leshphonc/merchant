<template>
  <div>
    <van-nav-bar :border="false" :title="`商品列表`" @click-left="_goBack" fixed left-arrow>
      <van-icon name="ellipsis" slot="right" />
    </van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="电商">
        <eCommerce-product></eCommerce-product>
      </van-tab>
      <van-tab title="外卖">内容 2</van-tab>
      <van-tab title="服务">内容 3</van-tab>
      <van-tab title="套餐">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ECommerceProduct from './ECommerceProduct'

export default {
  name: 'commodityList',

  mixins: [],

  components: {
    ECommerceProduct,
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

  methods: {},
}
</script>

<style lang="less" scoped></style>
