<template>
  <div>
    <div :key="index" v-for="(item, index) in list">
      <div class="white-space"></div>
      <van-cell-group>
        <van-cell :title="item.name" @click="_unEnabled" is-link />
      </van-cell-group>
    </div>
    <div class="tab-bar-holder-sp"></div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'marketTypeCell',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._getMarketTypeList()
  },

  destroyed() {},

  methods: {
    ...mapActions('market', ['getMarketTypeList']),
    _getMarketTypeList() {
      this.getMarketTypeList().then(res => {
        this.list = res
      })
    },
    _unEnabled() {
      this.$toast({
        message: '手机端暂未开放此功能，请登录电脑端后台进行操作',
        duration: 1500,
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
