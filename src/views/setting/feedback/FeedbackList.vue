<template>
  <div>
    <van-sticky :offset-top="offsetTop">
      <van-dropdown-menu>
        <van-dropdown-item :options="storeColumns" @change="_changeStore" v-model="store_id" />
        <van-dropdown-item :options="intentColumns" @change="_changeIntent" v-model="intent_id" />
        <van-dropdown-item :options="typeColumns" @change="_changeType" v-model="type_id" />
        <van-dropdown-item ref="item" title="时间筛选">
          <time-picker
            :data="[start_time, end_time]"
            :pickEndTime="_pickEndTime"
            :pickStartTime="_pickStartTime"
            endLabel="结束时间"
            showDefault
            startLabel="开始时间"
          ></time-picker>
          <van-button @click="_search" block type="primary">确认</van-button>
        </van-dropdown-item>
      </van-dropdown-menu>
    </van-sticky>

    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <div :key="index" v-for="(item, index) in list">
        <van-panel :desc="item.addtime" :status="item.intent" :title="item.type">
          <div>
            <van-rate allow-half readonly v-model="item.grade" void-color="#eee" void-icon="star" />
            <van-row style="margin-top: 12px;">
              <van-col span="12">
                <div>店铺：{{ item.store_name }}</div>
              </van-col>
              <van-col span="12">
                <div>设备：{{ item.remark }}</div>
              </van-col>
            </van-row>
          </div>
        </van-panel>
        <div class="white-space"></div>
      </div>
      <div class="nomore" v-if="list.length === 0">暂无数据</div>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePicker from '@/components/TimePicker'

export default {
  name: 'feedbackList',

  mixins: [],

  components: {
    TimePicker,
  },

  props: {},

  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      refreshing: false,
      storeColumns: [],
      intentColumns: [],
      typeColumns: [],
      store_id: '0',
      intent_id: '0',
      type_id: '0',
      start_time: this.$moment()
        .subtract(30, 'days')
        .format('YYYY-MM-DD'),
      end_time: this.$moment().format('YYYY-MM-DD'),
    }
  },

  computed: {
    offsetTop() {
      return (90 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getFeedbackList()
    this.getFeedbackIntentList().then(res => {
      this.intentColumns = [
        {
          text: '全部意图',
          value: '0',
        },
        ...res.map(item => {
          return {
            value: item.id,
            text: item.name,
          }
        }),
      ]
    })
    this.getFeedbackTypeList().then(res => {
      this.typeColumns = [
        {
          text: '全部类型',
          value: '0',
        },
        ...res.map(item => {
          return {
            value: item.id,
            text: item.name,
          }
        }),
      ]
    })
    this.getStoreFrontList().then(res => {
      this.storeColumns = [
        {
          text: '全部店铺',
          value: '0',
        },
        ...res.map(item => {
          return {
            value: item.store_id,
            text: item.name,
          }
        }),
      ]
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('feedback', ['getFeedbackList', 'getFeedbackIntentList', 'getFeedbackTypeList']),
    ...mapActions('storeFront', ['getStoreFrontList']),
    _onRefresh() {
      // 清空列表数据
      this.finished = false

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.loading = true
      this._getFeedbackList()
    },
    _getFeedbackList() {
      this.getFeedbackList({
        store_id: this.store_id,
        intent_id: this.intent_id,
        type_id: this.type_id,
        start_time: this.start_time,
        end_time: this.end_time,
      }).then(res => {
        this.loading = false
        this.finished = true
        let arr = res.map(item => {
          return {
            ...item,
            grade: item.grade / 2,
          }
        })
        this.list = arr
      })
    },
    _pickStartTime(data) {
      this.start_time = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEndTime(data) {
      this.end_time = this.$moment(data).format('YYYY-MM-DD')
    },
    _search() {
      this._onRefresh()
      this.$refs.item.toggle()
    },
    _changeStore() {
      this._onRefresh()
    },
    _changeIntent() {
      this._onRefresh()
    },
    _changeType() {
      this._onRefresh()
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}

.nomore {
  text-align: center;
  font-size: 14px;
  color: @font-gray-c;
  margin-top: 8px;
}
</style>
