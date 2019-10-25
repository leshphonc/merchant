<template>
  <div>
    <van-pull-refresh @refresh="onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="onLoad" finished-text="没有更多了" v-model="loading">
        <van-cell :key="item.goods_id" :title="item.s_name" v-for="item in list" />
      </van-list>
    </van-pull-refresh>
    <div class="tab-bar-holder"></div>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="apps-o">商品</van-tabbar-item>
      <van-tabbar-item icon="label-o">分类</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      active: 0,
      loading: false,
      finished: false,
      refreshing: false,
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['getCommodityList']),
    // 异步更新数据
    onLoad() {
      this.getCommodityList(this.page).then(res => {
        this.loading = false
        if (res.lists.length === 0) {
          this.finished = true
        } else {
          this.page += 1
          this.list.push(...res.lists)
        }
      })
    },
    // 刷新列表
    onRefresh() {
      this.getCommodityList().then(res => {
        this.$toast('刷新成功')
        this.page = 1
        this.list = res.lists
        this.refreshing = false
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
