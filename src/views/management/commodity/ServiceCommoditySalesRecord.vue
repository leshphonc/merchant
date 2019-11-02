<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="服务项目销售记录"></van-nav-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'serviceCommoditySalesRecord',

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
    this._readServiceCommoditySalesRecord(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['readServiceCommoditySalesRecord']),
    _readServiceCommoditySalesRecord(id) {
      this.readServiceCommoditySalesRecord(id).then(res => {
        console.log(res)
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
