<template>
  <div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-card
          :key="item.meal_id"
          :num="item.total_num"
          :price="item.price"
          :thumb="item.pic"
          :title="item.meal_name"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <van-tag plain type="danger">每人限购：{{ item.person_num }}</van-tag>
          </div>
          <div slot="bottom">
            <div>创建时间：{{ $moment(item.create_time * 1000).format('YYYY-MM-DD') }}</div>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'packageList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      loading: false,
      finished: false,
      refreshing: false,
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : '点击右上角添加按钮添加商品'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('storeFront', ['getStoreFrontBindPackageList']),
    // 异步更新电商商品数据
    _onLoad() {
      const { id } = this.$route.params
      this.getStoreFrontBindPackageList({
        store_id: id,
        page: this.page,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
    // 刷新套餐列表
    _onRefresh() {
      const { id } = this.$route.params
      this.getStoreFrontBindPackageList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
