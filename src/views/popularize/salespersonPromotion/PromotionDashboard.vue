<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="店员推广统计"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group>
      <van-cell is-link title="扫码总人数" to="/salespersonPromotion/scanCodeRecord" value="1" />
      <van-cell is-link title="绑粉总人数" to="/salespersonPromotion/bindingFansRecord" value="1" />
      <van-cell is-link title="购买总人数" to="/salespersonPromotion/buyersRecord" value="1" />
      <van-cell title="销售佣金" value="0" />
      <van-cell title="推广佣金" value="0" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'promotionDashboard',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped></style>
