<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => this.$router.push('/redEnvelope/redEnvelopeCRU')"
      fixed
      left-arrow
      right-text="创建"
      title="红包广场"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <van-card
          :key="item.id"
          :tag="status[item.is_open]"
          :thumb="item.pic"
          :title="item.title"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <van-tag plain type="danger">总金额：{{ item.total_money }} 元</van-tag>
            <van-tag plain type="danger">{{ isPublic[item.is_fabu] }}</van-tag>
          </div>
          <div slot="desc">
            <van-row>
              <van-col tag="span">金额上限：{{ item.item_max }}</van-col>
              <van-col offset="1" tag="span">金额下限：{{ item.item_min }}</van-col>
            </van-row>
            <van-row>
              <van-col tag="span">领取人数：{{ item.people }}</van-col>
              <van-col offset="1" tag="span">领取次数：{{ item.get_number }}</van-col>
            </van-row>
            <div>活动时间：{{ item.start_time }} - {{ item.end_time }}</div>
          </div>
          <div slot="footer">
            <div class="white-space"></div>
            <van-button @click="_deleteRedEnvelope(item.id)" size="small" type="danger" v-if="item.is_fabu === '0'">删除</van-button>
            <van-button @click="_publicRedEnvelope(item.id)" size="small" v-if="item.is_fabu === '0'">发布</van-button>
            <van-button :to="`/redEnvelope/redEnvelopeReceivingRecord/${item.id}`" size="small">领取记录</van-button>
            <van-button :to="`/redEnvelope/redEnvelopeCRU/${item.id}`" size="small">编辑</van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'redEnvelopeList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      finished: false,
      refreshing: false,
      loading: false,
      status: {
        0: '未开启',
        1: '已开启',
      },
      isPublic: {
        0: '未发布',
        1: '已上架',
        2: '已下架',
        3: '已完结',
      },
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('redEnvelope', ['getRedEnvelopeList', 'publicRedEnvelope', 'deleteRedEnvelope']),
    // 加载更多红包列表
    _onLoad() {
      this.getRedEnvelopeList(this.page).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    // 刷新红包列表
    _onRefresh() {
      this.getRedEnvelopeList().then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
      })
    },
    _publicRedEnvelope(id) {
      if (this.loading) return
      this.loading = true
      this.publicRedEnvelope(id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._onRefresh()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _deleteRedEnvelope(id) {
      if (this.loading) return
      this.$dialog
        .confirm({
          title: '删除',
          message: '确认删除此红包活动？',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.loading = true
              this.deleteRedEnvelope(id)
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
