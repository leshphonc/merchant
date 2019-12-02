<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="在线访问用户"></van-nav-bar>
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
            <span style="float: left;">最后登录：{{ $moment(item.last_time * 1000).format('YYYY-MM-DD HH:mm') }}</span>
            <van-button @click="_controlBehaviorPopup(item.uid)" size="small" type="primary">用户行为</van-button>
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
    <van-popup class="behavior" position="bottom" safe-area-inset-bottom v-model="showBehaviorPopup">
      <van-pull-refresh @refresh="_behaviorOnRefresh" v-model="behaviorRefreshing">
        <van-list
          :finished="behaviorFinished"
          :immediate-check="false"
          @load="_behaviorOnLoad"
          finished-text="没有更多了"
          v-model="loading"
        >
          <div :key="item.maycms_id" v-for="item in behaviorList">
            <van-panel
              :desc="$moment(item.date * 1000).format('YYYY-MM-DD HH:mm')"
              :status="item.name"
              :title="`行为编号：${item.biz_id}`"
            ></van-panel>
            <div class="white-space"></div>
          </div>
        </van-list>
      </van-pull-refresh>
      <van-button @click="_controlBehaviorPopup(0)" type="primary">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'accessUserList',

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
      showBehaviorPopup: false,
      startTime: new Date(this.$moment().subtract(30, 'days')),
      endTime: new Date(),
      behaviorPage: 1,
      behaviorList: [],
      behaviorRefreshing: false,
      behaviorFinished: false,
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
    ...mapActions('member', ['getAccessUserList', 'getAccessUserBehaviorList']),
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    _controlBehaviorPopup(uid) {
      if (uid) {
        this.lastUid = uid
        this.behaviorPage = 1
        this.behaviorList = []
        this.behaviorRefreshing = false
        this.behaviorFinished = false
        this.loading = false
        this.$nextTick(() => {
          this.getAccessUserBehaviorList({
            uid,
            page: 1,
          }).then(res => {
            this.loading = false
            if (res.behavior_list) {
              if (res.behavior_list.length < 10) {
                this.behaviorFinished = true
              } else {
                this.behaviorPage += 1
              }
              this.behaviorList.push(...res.behavior_list)
            } else {
              this.behaviorFinished = true
            }
            this.showBehaviorPopup = !this.showBehaviorPopup
          })
        })
      } else {
        this.showBehaviorPopup = !this.showBehaviorPopup
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
      this.getAccessUserList({
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
      this.getAccessUserList({
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
    _behaviorOnRefresh() {
      this.getAccessUserBehaviorList({
        uid: this.lastUid,
        page: 1,
      }).then(res => {
        this.behaviorRefreshing = false
        this.behaviorPage = 2
        this.behaviorList = res.behavior_list
      })
    },
    _behaviorOnLoad() {
      this.getAccessUserBehaviorList({
        uid: this.lastUid,
        page: this.behaviorPage,
      }).then(res => {
        this.loading = false
        if (res.behavior_list) {
          if (res.behavior_list.length < 10) {
            this.behaviorFinished = true
          } else {
            this.behaviorPage += 1
          }
          this.behaviorList.push(...res.behavior_list)
        } else {
          this.behaviorFinished = true
        }
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
  .van-button {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>
