<template>
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
        <div slot="footer">
          <van-button :to="`/commodity/reserveCommodityPreferential/${item.appoint_id}`" size="small">优惠</van-button>
          <van-button :to="`/commodity/reserveCommodityCRU/${item.appoint_id}`" size="small" v-if="!item.type">编辑</van-button>
        </div>
      </van-card>
    </van-list>
  </van-pull-refresh>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'reserveCommodity',

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
    ...mapActions('commodity', ['getReserveCommodityList', 'deleteReserveCommodity']),
    // 异步更新电商商品数据
    _onLoad() {
      this.getReserveCommodityList(this.page).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    // 刷新套餐列表
    _onRefresh() {
      this.getReserveCommodityList().then(res => {
        this.page = 2
        this.list = res.lists
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
              this.deleteReserveCommodity(id)
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
