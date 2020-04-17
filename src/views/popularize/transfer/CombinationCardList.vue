<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="组合卡列表"></van-nav-bar>
    <div class="nav-bar-holder-sp"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <van-card
          :class="item.is_activate !== '0' ? 'active' : ''"
          :desc="`${item.nickname || '未知用户'} - ${item.phone || '暂无号码'}`"
          :key="item.id"
          :price="item.meal_price"
          :tag="item.is_activate !== '0' ? '已激活' : '未激活'"
          :thumb="item.pic"
          :title="item.meal_name"
          v-for="item in list"
        >
          <template #tags>
            <van-tag plain type="danger">有效天数：{{ item.meal_day_num }}</van-tag>
          </template>
          <template #footer v-if="item.is_activate !== '0'">
            <van-button @click="_controlTransfer(item.id)" size="mini">过户</van-button>
          </template>
        </van-card>
      </van-list>
    </van-pull-refresh>
    <!-- 过户弹出层 -->
    <van-dialog
      :beforeClose="_transferCombinationCard"
      confirm-button-text="确认过户"
      show-cancel-button
      title="过户"
      v-model="showTransfer"
    >
      <van-field input-align="center" placeholder="请输入过户人手机号" type="number" v-model="phone"></van-field>
    </van-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'combinationCardList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      loading: false,
      list: [],
      page: 1,
      refreshing: false,
      finished: false,
      showTransfer: false,
      id: '',
      phone: '',
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : '暂无商品'
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('transfer', ['getCombinationCardList', 'transferCombinationCard']),
    _controlTransfer(id) {
      this.id = id
      this.showTransfer = true
    },
    _onRefresh() {
      this.getCombinationCardList(1).then(res => {
        this.page = 2
        this.list = res.list
        this.refreshing = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    _onLoad() {
      this.getCombinationCardList(this.page).then(res => {
        this.loading = false
        if (res.list.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.list)
      })
    },
    _transferCombinationCard(action, done) {
      if (action === 'cancel') {
        this.id = ''
        this.phone = ''
        done()
      } else if (action === 'confirm') {
        if (!new RegExp(/^[1][3-9][0-9]{9}$/).test(this.phone)) {
          this.$notify({
            type: 'warning',
            message: '请填写正确的手机号',
          })
          this.id = ''
          this.phone = ''
          done()
          return
        }
        this.transferCombinationCard({
          id: this.id,
          phone: this.phone,
        }).then(() => {
          this.$toast({
            icon: 'success',
            message: '过户成功',
            duration: 1000,
            onClose: () => {
              this._onRefresh()
            },
          })
        })
        this.id = ''
        this.phone = ''
        done()
      }
    },
  },
}
</script>

<style lang="less" scoped>
.active {
  .van-tag--mark {
    background: green;
  }
}
</style>
