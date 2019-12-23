<template>
  <div>
    <van-nav-bar @click-left="_goBack" fixed left-arrow title="申请加入平台"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <div :key="index" v-for="(item, index) in list">
        <van-panel :desc="item.context" :icon="item.logo" :status="item.status_name" :title="item.plat_name">
          <div v-html="item.text || '暂无介绍'"></div>
          <div slot="footer" v-if="item.status === '2' || item.status === '3'">
            <van-button @click="_joinSubPlatform(item.plat_id)" size="small">申请加入</van-button>
          </div>
        </van-panel>
        <div class="white-space"></div>
      </div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'joinThePlatform',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      refreshing: false,
      loading: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    this._onRefresh()
  },

  destroyed() {},

  methods: {
    ...mapActions('platform', ['getSubPlatformList', 'joinTheSubPlatform']),
    _goBack() {
      window.history.go(-1)
    },
    _onRefresh() {
      this.getSubPlatformList().then(res => {
        this.list = res
        this.refreshing = false
      })
    },
    _joinSubPlatform(id) {
      if (this.loading) return
      this.loading = true
      this.joinTheSubPlatform(id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1000,
            onClose: () => {
              // 解锁
              this.loading = false
              this._onRefresh()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.van-cell__left-icon {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  .van-icon__image {
    width: 100%;
    height: 100%;
  }
}
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
  overflow: auto;
}
.van-panel__footer {
  text-align: right;
}
</style>
