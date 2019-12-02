<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="服务项目销售记录"></van-nav-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'serviceSalesRecord',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    this._readServiceSalesRecord(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['readServiceSalesRecord']),
    _readServiceSalesRecord(id) {
      this.readServiceSalesRecord(id).then(() => {})
    },
  },
}
</script>

<style lang="less" scoped></style>
