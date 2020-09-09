<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="机器人&推广"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group>
      <van-cell center is-link label="机器人管理" title="机器人" to="/smartScreen/smartScreenList" />
      <van-cell center is-link label="机器人推广内容" title="推广列表" to="/smartScreen/smartScreenPosterList" />
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
