<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="账户明细"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs v-model="active">
      <van-tab title="充值记录">
        <div class="white-space"></div>
      </van-tab>
      <van-tab title="提现记录">内容 2</van-tab>
      <van-tab title="收支记录">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'accountDetail',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      active: 0,
    }
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
