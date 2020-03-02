<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="业务信息配置"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="零售配置" v-if="detail.have_mall === '1'">
      <van-cell :to="`/storefront/eCommerceSetting/${detail.store_id}`" is-link title="配置编辑"></van-cell>
      <van-cell :to="`/storefront/eCommerceSettingPreferential/${detail.store_id}`" is-link title="店铺优惠"></van-cell>
    </van-cell-group>
    <van-cell-group title="外卖配置" v-if="detail.peisong === '1'">
      <van-cell is-link title="配置编辑"></van-cell>
      <van-cell is-link title="店铺优惠"></van-cell>
    </van-cell-group>
    <van-cell-group title="服务配置" v-if="detail.have_service === '1'">
      <van-cell :to="`/storeFront/serviceSetting/${detail.store_id}`" is-link title="配置编辑"></van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'storeFrontBusiness',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      detail: {},
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id &&
      this.readStoreFrontDetail(id).then(res => {
        this.detail = res
      })
  },

  destroyed() {},

  methods: {
    ...mapActions('storeFront', ['readStoreFrontDetail']),
  },
}
</script>

<style lang="less" scoped></style>
