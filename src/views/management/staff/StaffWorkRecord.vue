<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="店员工作记录"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop46">
      <div class="white-space bg"></div>
    </van-sticky>
    <van-tabs :offset-top="offsetTop" sticky type="card">
      <van-tab title="到岗记录">
        <arrival-record :storeColumns="storeColumns" />
      </van-tab>
      <van-tab title="开单记录">
        <billing-record :storeColumns="storeColumns" />
      </van-tab>
      <van-tab title="服务记录">
        <service-record :storeColumns="storeColumns" />
      </van-tab>
      <van-tab title="销售记录">
        <sales-record :storeColumns="storeColumns" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ArrivalRecord from './components/ArrivalRecord'
import BillingRecord from './components/BillingRecord'
import ServiceRecord from './components/ServiceRecord'
import SalesRecord from './components/SalesRecord'
export default {
  name: 'staffWorkRecord',

  mixins: [],

  components: {
    ArrivalRecord,
    BillingRecord,
    ServiceRecord,
    SalesRecord,
  },

  props: {},

  data() {
    return {
      storeColumns: [{ text: '全部店铺', value: '' }],
    }
  },

  computed: {
    offsetTop46() {
      return (46 / 375) * document.body.clientWidth
    },
    offsetTop() {
      return (54 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getStoreList(1).then(res => {
      this.storeColumns = res.store_list.map(item => {
        return {
          text: item.label,
          value: item.value,
        }
      })
    })
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
  },
}
</script>

<style lang="less" scoped>
.bg {
  background-color: @gray-background-c;
}
</style>
