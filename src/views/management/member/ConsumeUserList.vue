<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="消费用户"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <div class="white-space"></div>
      <van-row align="center" type="flex">
        <van-col style="flex: 1; margin: 0 8px; min-width: 0;">
          <div @click="_controlStartTimePicker" class="filter-box">
            <div class="van-ellipsis">{{ startTimeLabel }}</div>
            <i class="iconfont">&#xe6f0;</i>
          </div>
        </van-col>
        <span class="sp-line">-</span>
        <van-col style="flex: 1; margin: 0 8px; min-width: 0;">
          <div @click="_controlEndTimePicker" class="filter-box">
            <div class="van-ellipsis">{{ endTimeLabel }}</div>
            <i class="iconfont">&#xe6f0;</i>
          </div>
        </van-col>
      </van-row>
      <van-divider>共 {{ total }} 条记录</van-divider>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <van-card :key="item.uid" :thumb="item.avatar" :title="item.nickname" lazy-load v-for="item in list">
          <div class="desc" slot="desc">
            <a :href="'tel:' + item.phone">
              {{ item.phone }}
              <van-icon color="#1989fa" name="phone-o" />
            </a>
          </div>
          <div slot="tags">
            <van-tag plain type="danger">{{ item.sex === '1' ? '男' : '女' }}</van-tag>
          </div>
          <div class="footer" slot="footer">
            <span style="float: left;">最近消费：{{ $moment(item.max_time * 1000).format('YYYY-MM-DD HH:mm') }}</span>
            <van-button @click="_controlRecordPopup(item.uid)" size="small" type="primary">消费记录</van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>

    <!-- 弹出层 -->
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        :max-date="endTime"
        :value="startTime"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        show-toolbar
        type="date"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker
        :min-date="startTime"
        :value="endTime"
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        show-toolbar
        type="date"
      />
    </van-popup>
    <!-- 用户行为 -->
    <van-popup class="behavior" position="bottom" safe-area-inset-bottom v-model="showRecordPopup">
      <van-pull-refresh @refresh="_recordOnRefresh" v-model="recordRefreshing">
        <van-list
          :finished="recordFinished"
          :immediate-check="false"
          @load="_recordOnLoad"
          finished-text="没有更多了"
          v-model="loading"
        >
          <div :key="item.order_id" v-for="item in recordList">
            <van-panel
              :desc="$moment(item.pay_time * 1000).format('YYYY-MM-DD HH:mm')"
              :status="item.name"
              :title="item.order_name"
            >
              <div class="content">
                <div>购买数量：{{ item.num }}</div>
                <div>消费金额：{{ item.price }}</div>
              </div>
            </van-panel>
            <div class="white-space"></div>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-button @click="_controlRecordPopup(0)" type="primary">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'consumeUserList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      total: 0,
      refreshing: false,
      finished: false,
      loading: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      showRecordPopup: false,
      startTime: new Date(this.$moment().subtract(30, 'days')),
      endTime: new Date(),
      recordPage: 1,
      recordList: [],
      recordRefreshing: false,
      recordFinished: false,
      lastUid: '',
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    startTimeLabel() {
      return this.$moment(this.startTime).format('YYYY-MM-DD')
    },
    endTimeLabel() {
      return this.$moment(this.endTime).format('YYYY-MM-DD')
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('member', ['getConsumeUserList', 'getUserConsumingRecord']),
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    _controlRecordPopup(uid) {
      if (uid) {
        this.lastUid = uid
        this.recordPage = 1
        this.recordList = []
        this.recordRefreshing = false
        this.recordFinished = false
        this.loading = false
        this.$nextTick(() => {
          this.getUserConsumingRecord({
            uid,
            page: 1,
          }).then(res => {
            this.loading = false
            if (res.lists.length < 10) {
              this.recordFinished = true
            } else {
              this.recordPage += 1
            }
            this.recordList.push(...res.lists)
            this.showRecordPopup = !this.showRecordPopup
          })
        })
      } else {
        this.showRecordPopup = !this.showRecordPopup
      }
    },
    _pickStartTime(data) {
      this.startTime = data
      this._onRefresh()
      this._controlStartTimePicker()
    },
    _pickEndTime(data) {
      this.endTime = data
      this._onRefresh()
      this._controlEndTimePicker()
    },
    _onRefresh() {
      this.getConsumeUserList({
        page: 1,
        begin_time: this.startTimeLabel,
        end_time: this.endTimeLabel,
      }).then(res => {
        this.refreshing = false
        this.page = 2
        this.total = res.total
        this.list = res.lists
      })
    },
    _onLoad() {
      this.getConsumeUserList({
        page: this.page,
        begin_time: this.startTimeLabel,
        end_time: this.endTimeLabel,
      }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
        this.total = res.total
      })
    },
    _recordOnRefresh() {
      this.getUserConsumingRecord({
        uid: this.lastUid,
        page: 1,
      }).then(res => {
        this.recordRefreshing = false
        this.recordPage = 2
        this.recordList = res.lists
      })
    },
    _recordOnLoad() {
      console.log(111)
      this.getUserConsumingRecord({
        uid: this.lastUid,
        page: this.recordPage,
      }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.recordFinished = true
        } else {
          this.recordPage += 1
        }
        this.recordList.push(...res.lists)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.sp-line {
  color: @gray-deep-c;
}

.desc {
  margin-bottom: 1px;
  a {
    color: @black-light-c !important;
    .van-icon {
      vertical-align: -2px;
    }
  }
  font-size: 12px;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/deep/.van-sticky {
  background-color: @gray-background-c;
  overflow: hidden;
}

.van-popup {
  background-color: @gray-background-c;
  .van-pull-refresh {
    margin-bottom: 44px;
  }
  .content {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: @black-c;
    padding: 10px 16px;
  }
  .van-button {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
