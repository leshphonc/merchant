<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="套餐销售记录"></van-nav-bar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'packageSalesRecord',

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
    this._readPackageSalesRecord(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['readPackageSalesRecord']),
    _readPackageSalesRecord(id) {
      this.readPackageSalesRecord(id).then(res => {
        console.log(res)
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
