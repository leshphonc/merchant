<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="店员推广详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-dropdown-menu>
      <van-dropdown-item :options="storeColumns" @change="_changeOption" v-model="store" />
    </van-dropdown-menu>
    <div class="white-space"></div>
    <time-picker-box :pickEndTime="_pickEndTime" :pickStartTime="_pickStartTime"></time-picker-box>
    <div class="white-space"></div>
    <van-cell
      :key="index"
      :label="`推广佣金: ${item.spread_money} 元  销售佣金: ${item.sale_money} 元`"
      :title="item.name"
      :to="`/staffPromotion/promotionDetail/${item.id}`"
      is-link
      v-for="(item, index) in this.list"
    ></van-cell>
  </div>
</template>

<script>
export default {
  name: 'staffPromotionIndex',

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
