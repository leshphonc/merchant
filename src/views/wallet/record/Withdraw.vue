<template>
  <div class="container">
    <van-sticky :offset-top="offsetTop">
      <van-row>
        <div class="white-space"></div>
        <van-col offset="1" span="8">
          <div @click="_controlTypePicker" class="filter-box">
            <div class="van-ellipsis">{{ typeLabel }}</div>
            <i class="iconfont">&#xe6f0;</i>
          </div>
          <div class="white-space"></div>
        </van-col>
      </van-row>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <div :key="item.id" v-for="item in list">
          <van-panel :status="`¥ ${item.money}`" :title="status[item.status].label">
            <div class="desc" v-html="item.desc"></div>
            <div class="white-space"></div>
            <div>备注：{{ item.remark }}</div>
            <div class="white-space"></div>
            <div>{{ item.withdraw_time }}</div>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 弹出层 -->
    <!-- 提现类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTypePicker">
      <van-picker
        :columns="typeColumns"
        :default-index="typeIndex"
        @cancel="_controlTypePicker"
        @confirm="_pickType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'withdraw',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      status: {
        0: {
          label: '审核中',
          color: '#ffb000',
        },
        1: {
          label: '已通过',
          color: '#669900',
        },
        2: {
          label: '被驳回',
          color: '#dd4a68',
        },
      },
      type: '2',
      showTypePicker: false,
      typeColumns: [
        { label: '微信钱包', value: '2' },
        { label: '对公账户', value: '1' },
      ],
    }
  },

  computed: {
    offsetTop() {
      return (90 / 375) * document.body.clientWidth
    },
    typeLabel() {
      const item = this.typeColumns.find(item => item.value === this.type)
      return item && item.label
    },
    typeIndex() {
      const index = this.typeColumns.findIndex(item => item.value === this.type)
      return index
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('wallet', ['withdrawRecord']),
    _controlTypePicker() {
      this.showTypePicker = !this.showTypePicker
    },
    _pickType(data) {
      this.type = data.value
      this._controlTypePicker()
      this.$nextTick(() => {
        this._onRefresh()
      })
    },
    _onLoad() {
      // 异步更新数据
      this._withdrawRecord()
    },
    // 刷新列表
    _onRefresh() {
      this.withdrawRecord({ page: 1, type: this.type }).then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
        this.finished = false
      })
    },
    _withdrawRecord() {
      this.withdrawRecord({ page: this.page, type: this.type }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  & > div:first-child {
    height: 52px !important;
  }
}
.van-panel__content {
  color: @font-gray-c;
  padding: 10px 16px;
}

.desc {
  font-size: 12px;
}

/deep/.van-sticky {
  background-color: @gray-background-c;
}
</style>
