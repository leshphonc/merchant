<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="推广管理"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group>
      <van-cell center is-link label="机器人布局、咨询、销售" title="机器人" to="/smartScreen/smartScreenList" />
      <van-cell center is-link label="本店与同城推广管理" title="推广列表" to="/smartScreen/smartScreenPosterList" />
      <van-cell center is-link label="勾选同城其他商户的推广内容并成功推广，可赚取佣金" title="联盟推广" to="/smartScreen/aroundPush" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'smartScreenDashboard',

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
