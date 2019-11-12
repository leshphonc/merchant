<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="充值提现"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs v-model="active">
      <van-tab title="系统余额账户">
        <div class="white-space"></div>
        <van-cell-group>
          <van-cell icon="cash-back-record" is-link title="充值"></van-cell>
          <van-cell icon="refund-o" is-link title="提现" to="/wallet/withDraw"></van-cell>
          <van-cell icon="notes-o" is-link title="账户明细" to="/wallet/accountDetail"></van-cell>
        </van-cell-group>
      </van-tab>
      <van-tab title="平安提现账户">内容 2</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'walletPanel',

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
