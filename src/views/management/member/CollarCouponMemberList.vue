<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="领券会员"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div class="white-space"></div>
    <van-tabs :offset-top="offsetTop" sticky type="card">
      <van-tab title="领卡会员"></van-tab>
      <van-tab title="会员卡分组"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'collarCouponMemberList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {
    offsetTop() {
      return (8 / 375) * document.body.clientWidth
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
