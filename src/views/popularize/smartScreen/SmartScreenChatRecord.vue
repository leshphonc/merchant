<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="机器人管理"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <van-dropdown-menu>
        <van-dropdown-item :options="storeOption" @change="_onChangeStore" v-model="store" />
        <van-dropdown-item :options="imaxOption" @change="_onRefresh" v-model="imax" />
        <van-dropdown-item ref="item" title="时间筛选">
          <time-picker
            :data="[startTime, endTime]"
            :pickEndTime="_pickEndTime"
            :pickStartTime="_pickStartTime"
            endLabel="结束时间"
            showDefault
            startLabel="开始时间"
          ></time-picker>
          <van-button @click="_onRefresh" block type="primary">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="item.id" v-for="item in list">
          <van-panel :desc="'机器人：' + item.robot_say" :title="'用户：' + item.people_say">
            <div>
              <van-row>
                <van-col span="24">对话时间：{{ item.create_time }}</van-col>
              </van-row>
              <div class="white-space"></div>
              <van-row>
                <van-col span="12">店铺：{{ item.store_name }}</van-col>
                <van-col span="12">机器人：{{ item.imax_name }}</van-col>
              </van-row>
              <div class="white-space"></div>
            </div>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import TimePicker from '@/components/TimePicker'

import { mapActions } from 'vuex'
export default {
  name: 'smartScreenChatRecord',

  mixins: [],

  components: {
    TimePicker,
  },

  props: {},

  data() {
    return {
      startTime: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      endTime: this.$moment().format('YYYY-MM-DD'),
      storeOption: [{ text: '全部店铺', value: '' }],
      store: '',
      imaxOption: [{ text: '全部机器人', value: '' }],
      imax: '',
      loading: false,
      refreshing: false,
      finished: false,
      page: 1,
      list: [],
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : '暂无记录'
    },
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getStoreList().then(res => {
      const storeList = res.store_list.map(item => {
        return { text: item.label, value: item.value }
      })
      storeList.unshift({
        text: '全部店铺',
        value: '',
      })
      this.storeOption = storeList
    })
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('smartScreen', ['getSmartScreenDialogueRecord', 'getSmartScreenList']),
    // 刷新商品列表
    _onRefresh() {
      this.getSmartScreenDialogueRecord({
        page: 1,
        store_id: this.store,
        imax_id: this.imax,
        s_time: this.$moment(this.startTime).valueOf() / 1000,
        e_time: this.$moment(this.endTime).valueOf() / 1000,
      }).then(res => {
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
    _pickStartTime(data) {
      this.startTime = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEndTime(data) {
      this.endTime = this.$moment(data).format('YYYY-MM-DD')
    },
    // 异步更新商品数据
    _onLoad() {
      this.getSmartScreenDialogueRecord({
        page: this.page,
        store_id: this.store,
        imax_id: this.imax,
        s_time: this.$moment(this.startTime).valueOf() / 1000,
        e_time: this.$moment(this.endTime).valueOf() / 1000,
      }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    _onChangeStore(id) {
      this.store = id
      if (id) {
        this._getSmartScreenList(id)
      } else {
        this.imaxOption = [{ text: '全部机器人', value: '' }]
        this.imax = ''
      }
      this._onRefresh()
    },
    _getSmartScreenList(id) {
      this.getSmartScreenList(id).then(res => {
        const smartScreenList = res.map(item => {
          return { text: item.remark, value: item.imax_id }
        })
        smartScreenList.unshift({
          text: '全部机器人',
          value: '',
        })
        this.imaxOption = smartScreenList
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
  overflow: auto;
}

.van-cell__label {
  font-size: 14px;
}
</style>
