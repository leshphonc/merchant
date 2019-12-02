<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="团购订单"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-search @search="_onSearch" placeholder="请填写搜索关键词" v-model="keyword" />
      <van-dropdown-menu>
        <van-dropdown-item :options="option1" @change="_changeOption1" v-model="status" />
        <van-dropdown-item :options="option2" @change="_changeOption2" v-model="find_type" />
      </van-dropdown-menu>
    </van-sticky>

    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-card
          :key="index"
          :price="item.total_money"
          :tag="typeOption[item.type]"
          :thumb="item.pic"
          :title="item.s_name"
          @click="_goDetail(item.order_id)"
          desc="描述信息"
          num="2"
          v-for="(item, index) in list"
        >
          <div slot="tags">
            <van-tag plain type="danger">{{ groupOption[item.tuan_type] }}</van-tag>
            <van-tag plain type="danger">{{ statusOption[item.status] }}</van-tag>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'groupBuyList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      page: 1,
      keyword: '',
      status: '-1',
      find_type: '7',
      loading: false,
      finished: false,
      refreshing: false,
      groupOption: {
        0: '团购券',
        1: '代金券',
        2: '实物',
      },
      typeOption: {
        1: '未消费',
        2: '未发货',
        3: '已消费',
        4: '已发货',
      },
      statusOption: {
        1: '已取消',
        2: '线下支付',
        3: '已付款',
        4: '待评论',
        5: '已完成',
        6: '未付款',
      },
      option1: [
        {
          text: '全部类型',
          value: '-1',
        },
        {
          text: '未消费',
          value: '0',
        },
        {
          text: '已消费',
          value: '1',
        },
        {
          text: '已完成',
          value: '2',
        },
        {
          text: '已退款',
          value: '3',
        },
        {
          text: '已取消',
          value: '4',
        },
        {
          text: '部分退款',
          value: '6',
        },
        {
          text: '待发货',
          value: '99',
        },
      ],
      option2: [
        {
          text: '消费密码',
          value: '1',
        },
        {
          text: '快递单号',
          value: '2',
        },
        {
          text: '订单ID',
          value: '3',
        },
        {
          text: '用户ID',
          value: '5',
        },
        {
          text: '用户昵称',
          value: '6',
        },
        {
          text: '手机号码',
          value: '7',
        },
      ],
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('order', ['getGroupBuyList']),
    // 异步更新电商商品数据
    _onLoad() {
      const { id } = this.$route.params
      this.getGroupBuyList({
        group_id: id,
        page: this.page,
        status: this.status,
        find_type: this.find_type,
        keyword: this.keyword,
      }).then(res => {
        this.loading = false
        if (res.order_list.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.order_list)
      })
    },
    // 刷新套餐列表
    _onRefresh() {
      const { id } = this.$route.params
      this.getGroupBuyList({
        group_id: id,
        page: 1,
        status: this.status,
        find_type: this.find_type,
        keyword: this.keyword,
      }).then(res => {
        this.page = 2
        this.list = res.order_list
        this.refreshing = false
      })
    },
    // 搜索商品
    _onSearch(value) {
      this.keyword = value
      this._onRefresh()
    },
    // 选项1更改
    _changeOption1(value) {
      this.status = value
      this._onRefresh()
    },
    // 选项2更改
    _changeOption2(value) {
      this.find_type = value
    },
    // 进入详情
    _goDetail(id) {
      this.$router.push(`/order/groupBuyOrderDetail/${id}`)
    },
  },
}
</script>

<style lang="less" scoped></style>
