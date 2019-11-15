<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="账户明细"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-tabs v-model="active">
        <van-tab title="充值记录"></van-tab>
        <van-tab title="提现记录"></van-tab>
        <van-tab title="收支记录"></van-tab>
      </van-tabs>
    </van-sticky>
    <div class="white-space"></div>
    <topup v-show="active === 0"></topup>
    <withdraw v-show="active === 1"></withdraw>
    <income-and-expenditure v-show="active === 2"></income-and-expenditure>
  </div>
</template>

<script>
import Topup from './record/Topup'
import Withdraw from './record/Withdraw'
import IncomeAndExpenditure from './record/IncomeAndExpenditure'
export default {
  name: 'accountDetail',

  mixins: [],

  components: {
    Topup,
    Withdraw,
    IncomeAndExpenditure,
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
