<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => this.$router.push('/gift/giftCRU')"
      fixed
      left-arrow
      right-text="创建"
      title="礼品管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-search @clear="_clear" @search="_search" placeholder="请填写搜索关键词" shape="round" v-model="keyword" />
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <van-card
          :key="item.gift_id"
          :tag="item.status === '0' ? '关闭' : '开启'"
          :thumb="item.wap_pic_list[0].image"
          :title="item.gift_name"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <div>销量：{{ item.sale_count }}</div>
            <div>库存：{{ item.sku }}</div>
          </div>
          <div slot="footer">
            <van-button @click="_deleteGift(item.gift_id)" size="small" type="danger">删除</van-button>
            <van-button :to="`/gift/giftOrderList/${item.gift_id}`" size="small">商品订单</van-button>
            <van-button :to="`/gift/giftCRU/${item.gift_id}`" size="small">编辑</van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'giftList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      refreshing: false,
      finished: false,
      loading: false,
      keyword: '',
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('gift', ['getGiftList', 'deleteGift']),
    // 刷新零售商品列表
    _onRefresh(value) {
      this.getGiftList({ page: 1, keyword: value || this.keyword }).then(res => {
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
      this.getGiftList({ page: this.page, keyword: this.keyword }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    // 搜索
    _search(value) {
      this.keyword = value
      this._onRefresh(value)
    },
    // 清空搜索
    _clear() {
      this.keyword = ''
      this._onRefresh()
    },
    // 删除礼品
    _deleteGift(id) {
      if (this.loading) return
      this.$dialog.confirm({
        title: '删除礼品',
        message: '删除后无法恢复，是否删除？',
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            this.loading = true
            this.deleteGift(id)
              .then(() => {
                this.$toast.success({
                  message: '操作成功',
                  forbidClick: true,
                  duration: 1500,
                  onClose: () => {
                    // 解锁
                    this.loading = false
                    this._onRefresh()
                    done()
                  },
                })
              })
              .catch(() => {
                this.loading = false
                done()
              })
          } else {
            done()
          }
        },
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
