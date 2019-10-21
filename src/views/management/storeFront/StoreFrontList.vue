<template>
  <div>
    <van-nav-bar
      @click-left="_goBack"
      @click-right="_createStoreFront"
      fixed
      left-arrow
      right-text="创建店铺"
      title="店铺列表"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div :key="i" v-for="(item, i) in storeFrontList">
      <van-panel>
        <div slot="header">
          <panel-header :data="item"></panel-header>
        </div>
        <div slot="footer" style="text-align: right;">
          <van-button size="small" type="primary">资质审核</van-button>
          <van-button size="small" type="primary">业务信息</van-button>
          <van-button size="small" type="primary">基础信息</van-button>
        </div>
      </van-panel>
      <div class="white-space"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import PanelHeader from '@/components/PanelHeader'

export default {
  name: '',

  mixins: [],

  components: {
    PanelHeader,
  },

  props: {},

  data() {
    return {}
  },

  computed: {
    ...mapState('storefront', ['storeFrontList']),
  },

  watch: {},

  created() {},

  mounted() {
    this.getStoreFrontList()
  },

  destroyed() {},

  methods: {
    ...mapActions('storefront', ['getStoreFrontList']),
    _goBack() {
      this.$router.go(-1)
    },
    _createStoreFront() {
      this.$router.push('/storefront/storefrontCRU').catch(err => {
        err
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
