<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="店员推广详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky>
      <van-tab title="扫码记录">
        <ScanCodeRecord></ScanCodeRecord>
      </van-tab>
      <van-tab title="绑粉记录">
        <BindingFansRecord></BindingFansRecord>
      </van-tab>
      <van-tab title="购买记录">
        <BuyersRecord></BuyersRecord>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import ScanCodeRecord from './components/ScanCodeRecord'
import BindingFansRecord from './components/BindingFansRecord'
import BuyersRecord from './components/BuyersRecord'

export default {
  name: 'staffPromotionIndex',

  mixins: [],

  components: {
    ScanCodeRecord,
    BindingFansRecord,
    BuyersRecord,
  },

  props: {},

  data() {
    return {}
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
