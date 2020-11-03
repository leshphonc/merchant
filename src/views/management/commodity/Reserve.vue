<template>
  <div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-card
          :key="item.appoint_id"
          :tag="item.appoint_type === '1' ? '上门' : '到店'"
          :thumb="item.pic"
          :title="item.appoint_name"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <van-tag plain type="success" v-if="item.check_status === '1'">审核通过</van-tag>
            <van-tag plain type="danger" v-else>待审核</van-tag>
            <van-tag plain type="success" v-if="item.appoint_status === '1'">开启</van-tag>
            <van-tag plain type="danger" v-else>关闭</van-tag>
            <van-tag plain type="danger" v-if="item.payment_status === '1'">定金: {{ item.payment_money }}元</van-tag>
            <van-tag plain type="success" v-else>不收定金</van-tag>
          </div>
          <div slot="price">已预定：{{ item.appoint_sum }}</div>
          <div slot="footer" v-if="$route.fullPath === '/commodity'">
            <van-button :to="`/commodity/reservePreferential/${item.appoint_id}`" size="small">优惠</van-button>
            <van-button :to="`/commodity/reserveCRU/${item.appoint_id}`" size="small" v-if="!item.type">
              编辑
            </van-button>
          </div>
          <div slot="footer" v-else>
            <van-button :to="`/reward/reserveReward/${item.appoint_id}`" size="small" type="primary">
              推广分佣设置
            </van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
    <van-divider :hairline="false" v-show="!loading && !list.length && $route.fullPath === '/commodity'">
      点击右上角创建商品
    </van-divider>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'reserve',

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
    ...mapActions('commodity', ['getReserveList', 'deleteReserve']),
    // 刷新套餐列表
    _onRefresh() {
      this.getReserveList().then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新零售商品数据
    _onLoad() {
      this.getReserveList(this.page).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
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
              this.deleteReserve(id)
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
        .catch(() => {})
    },
  },
}
</script>

<style lang="less" scoped></style>
