<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="优惠券派发"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky>
      <van-tab title="分组派发">
        <coupon-distribute-group></coupon-distribute-group>
      </van-tab>
      <van-tab title="个人派发">
        <coupon-distribute-single-person />
      </van-tab>
      <van-tab title="全部派发">
        <coupon-distribute-all />
      </van-tab>
      <van-tab title="派发记录">
        <coupon-distribute-record />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import CouponDistributeGroup from './components/CouponDistributeGroup'
import CouponDistributeSinglePerson from './components/CouponDistributeSinglePerson'
import CouponDistributeAll from './components/CouponDistributeAll'
import CouponDistributeRecord from './components/CouponDistributeRecord'

export default {
  name: 'memberCouponDistribute',

  mixins: [],

  components: {
    CouponDistributeGroup,
    CouponDistributeSinglePerson,
    CouponDistributeAll,
    CouponDistributeRecord,
  },

  props: {},

  data() {
    return {}
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
