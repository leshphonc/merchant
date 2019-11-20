<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="账户明细"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="充值记录">
        <topup></topup>
      </van-tab>
      <van-tab title="提现记录">
        <withdraw></withdraw>
      </van-tab>
      <van-tab title="收支记录">
        <income-and-expenditure></income-and-expenditure>
      </van-tab>
    </van-tabs>
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
