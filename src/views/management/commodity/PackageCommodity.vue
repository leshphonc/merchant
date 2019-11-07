<template>
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
        <div slot="footer">
          <van-button @click="_deleteCommodity(item.meal_id)" size="small" type="danger">删除</van-button>
          <van-button :to="`/commodity/packageCommoditySalesRecord/${item.meal_id}`" size="small">销售记录</van-button>
          <van-button :to="`/commodity/packageCommodityCRU/${item.meal_id}`" size="small" v-if="!item.type">编辑</van-button>
        </div>
      </van-card>
    </van-list>
  </van-pull-refresh>
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
    ...mapActions('commodity', ['getPackageCommodityList', 'deletePackageCommodity']),
    // 异步更新电商商品数据
    _onLoad() {
      this.getPackageCommodityList(this.page).then(res => {
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
      this.getPackageCommodityList().then(res => {
        this.page = 1
        this.list = res
        this.refreshing = false
      })
    },
    // 删除套餐
    _deleteCommodity(id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deletePackageCommodity(id)
                .then(() => {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._onRefresh()
                    },
                  })
                  done()
                })
                .catch(() => {
                  done()
                })
            } else {
              done()
            }
          },
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
}
</script>

<style lang="less" scoped></style>
