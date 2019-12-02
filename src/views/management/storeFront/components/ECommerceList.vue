<template>
  <div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-card
          :key="item.goods_id"
          :num="item.stock_num === '-1' ? '∞' : item.stock_num - item.sell_count"
          :origin-price="item.old_price"
          :price="item.price"
          :tag="item.statusstr"
          :thumb="item.list_pic"
          :title="item.s_name"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <van-tag plain type="danger">{{ item.freight_type === '1' ? '运费单独计算' : '运费最大值' }}</van-tag>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'eCommerceList',

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
    ...mapActions('storeFront', ['getStoreFrontBindECommerceList']),
    // 刷新电商商品列表
    _onRefresh() {
      const { id } = this.$route.params
      this.getStoreFrontBindECommerceList({
        store_id: id,
        page: 1,
      }).then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
      })
    },
    // 异步更新电商商品数据
    _onLoad() {
      const { id } = this.$route.params
      this.getStoreFrontBindECommerceList({
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
  },
}
</script>

<style lang="less" scoped></style>
