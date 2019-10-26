<template>
  <div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-card
          :key="item.goods_id"
          :num="item.stock_num === '-1' ? '∞' : item.stock_num"
          :origin-price="item.old_price"
          :price="item.price"
          :tag="item.statusstr"
          :thumb="item.image"
          :title="item.s_name"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <van-tag plain type="danger">标签</van-tag>
            <van-tag plain type="danger">标签</van-tag>
          </div>
          <div slot="footer">
            <van-button @click="_delete(item.store_id, item.goods_id)" size="small" type="danger">删除</van-button>
            <van-button size="small">优惠</van-button>
            <van-button size="small">编辑</van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
    <van-divider :hairline="false" v-show="!loading && !list.length">点击右上角创建商品</van-divider>
    <div class="tab-bar-holder"></div>
    <van-tabbar fixed v-model="active">
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
    ...mapActions('commodity', ['getECommerceCommodityList', 'deleteECommerceCommodity']),
    // 异步更新数据
    _onLoad() {
      this.getECommerceCommodityList(this.page).then(res => {
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
    _onRefresh() {
      this.getECommerceCommodityList().then(res => {
        this.page = 1
        this.list = res.lists
        this.refreshing = false
      })
    },
    // 删除电商产品
    _delete(store_id, goods_id) {
      this.$dialog
        .confirm({
          title: '删除',
          message: '删除后无法恢复，是否继续',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.deleteECommerceCommodity({ store_id, goods_id }).then(res => {
                if (res) {
                  this.$toast.success({
                    message: '删除成功',
                    duration: 800,
                    onClose: () => {
                      this._onRefresh()
                    },
                  })
                  done()
                }
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
