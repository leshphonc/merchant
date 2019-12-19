<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="智能屏推广"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group>
      <van-cell center is-link label="推广内容" title="推广列表" to="/smartScreen/smartScreenPosterList" />
      <van-cell center is-link label="屏幕详情" title="智能屏列表" to="/smartScreen/smartScreenList" />
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
