<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="充值提现"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs v-if="pingan === '1'" v-model="active">
      <van-tab title="系统余额账户"></van-tab>
      <van-tab title="平安提现账户"></van-tab>
    </van-tabs>
    <div v-show="active === 0">
      <div class="white-space"></div>
      <van-cell-group>
        <van-cell icon="cash-back-record" is-link title="充值" to="/wallet/addCredit"></van-cell>
        <van-cell icon="refund-o" is-link title="提现" to="/wallet/withDraw"></van-cell>
        <van-cell icon="notes-o" is-link title="账户明细" to="/wallet/accountDetail"></van-cell>
      </van-cell-group>
    </div>
    <div v-show="active === 1">
      <div class="white-space"></div>
      <div>123</div>
    </div>
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
      pingan: '0',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this.pingan = this.$getGlobal('pingan')
  },

  destroyed() {},

  methods: {},
}
</script>

<style lang="less" scoped></style>
