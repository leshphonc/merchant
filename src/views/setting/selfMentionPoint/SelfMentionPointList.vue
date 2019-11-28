<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => this.$router.push('/selfMentionPoint/selfMentionPointCRU')"
      fixed
      left-arrow
      right-text="创建"
      title="自提点管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-cell-group>
          <van-swipe-cell :key="item.value" v-for="item in list">
            <van-panel
              :desc="item.area_info.province"
              :status="item.phone"
              :title="item.name"
              class="self-mention-point"
              is-link
            >
              <div slot="default" style="text-align: right;padding: 5px 15px 10px 5px;">
                <van-button :to="`/selfMentionPoint/selfMentionPointCRU/${item.pick_addr_id}`" size="small">编辑</van-button>
                <van-button @click="_del(item.pick_addr_id)" class="sel_button" size="small">删除</van-button>
              </div>
            </van-panel>
            <template slot="right">
              <van-button square text="删除" type="danger" />
            </template>
          </van-swipe-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'selfMentionPointList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      error: false,
      loading: false,
      finished: false,
      refreshing: false,
      page: 1,
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
    ...mapActions('selfMentionPoint', ['getSelfMentionPointList', 'delSelfMentionPoint']),
    _getSelfMentionPointList() {
      console.log(this.page)
      this.getSelfMentionPointList(this.page).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
    _onRefresh() {
      this.getSelfMentionPointList(1).then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
      })
    },
    _onLoad() {
      this._getSelfMentionPointList()
    },
    _del(id) {
      this.delSelfMentionPoint(id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__header-value {
  color: @black-c;
}
.sel_button {
  color: @nav-bar-icon-color;
  background-color: @nav-bar-background-color;
}
.sel_button {
  margin-left: 4vw;
}
</style>
