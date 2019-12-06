<template>
  <div>
    <van-nav-bar fixed left-text="营销活动"></van-nav-bar>
    <div class="nav-bar-holder-sp"></div>
    <div class="white-space"></div>
    <van-grid clickable>
      <van-grid-item
        :icon="require(`@/assets/image/id_${item.id}.png`)"
        :key="item.name"
        :text="item.name"
        @click="_unEnabled"
        v-for="item in list"
      />
    </van-grid>
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

<style lang="less" scoped>
.van-nav-bar {
  height: 54px;
  line-height: 54px;
  background-color: #fff;
  .van-nav-bar__text {
    color: #000;
    font-size: 24px;
  }
}

/deep/.van-grid-item__icon {
  font-size: 32px;
}
</style>
