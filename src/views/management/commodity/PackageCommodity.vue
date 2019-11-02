<template>
  <div>
    <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
      <van-card
        :key="item.meal_id"
        :num="item.total_num"
        :price="item.price"
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
        <div slot="footer">
          <van-button @click="_deleteCommodity(item.store_id, item.goods_id)" size="small" type="danger">删除</van-button>
          <van-button :to="`/commodity/eCommerceCommodityPreferential/${item.goods_id}`" size="small">销售记录</van-button>
          <van-button :to="`/commodity/eCommerceCommodityCRU/${item.goods_id}`" size="small">编辑</van-button>
        </div>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'packageCommodity',

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
      return this.list.length ? '没有更多了' : ''
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['getPackageCommodityList']),
    // 异步更新电商商品数据
    _onLoad() {
      this.getPackageCommodityList(this.page).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
          this.list.push(...res)
        }
      })
    },
    _deleteCommodity() {},
  },
}
</script>

<style lang="less" scoped></style>
