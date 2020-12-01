<template>
  <div>
    <van-sticky :offset-top="offsetTop">
      <van-dropdown-menu>
        <van-dropdown-item :options="storeColumns" @change="_changeOption" v-model="store_id" />
        <van-dropdown-item :options="clockInColumns" @change="_changeClockIn" v-model="clock_type" />
        <van-dropdown-item :options="staffColumns" @change="_changeStaff" v-model="staff_id" />
        <van-dropdown-item ref="item" title="时间筛选">
          <time-picker
            :data="[startTime, endTime]"
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
      <van-list :finished="finished" :finished-text="finishText" @load="_onLoad" v-model="loading">
        <div :key="index" v-for="(item, index) in list">
          <van-panel :desc="`${item.created_at}`" :status="_getType(item.type)" :title="item.name">
            <template v-if="item.type === '4'">
              <div style="padding: 10px 16px; font-size: 13px">离岗原因：{{ item.remark }}</div>
            </template>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePicker from '@/components/TimePicker'

export default {
  name: 'arrivalRecord',

  mixins: [],

  components: {
    TimePicker,
  },

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      refreshing: false,
      finished: false,
      loading: false,
      startTime: this.$moment().subtract(30, 'days').format('YYYY-MM-DD'),
      endTime: this.$moment().format('YYYY-MM-DD'),
      store_id: '0',
      clock_type: '0',
      staff_id: '0',
      storeColumns: [
        {
          text: '全部店铺',
          value: '0',
        },
      ],
      clockInColumns: [
        {
          text: '全部类型',
          value: '0',
        },
      ],
      staffColumns: [
        {
          text: '全部店员',
          value: '0',
        },
      ],
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : '暂无记录'
    },
    offsetTop() {
      return (84 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getStoreAndClockInType().then(res => {
      let defaultClockInType = []
      let defaultStaff = []
      this.storeColumns = res.map((item, index) => {
        if (index === 0) {
          defaultClockInType = item.clock_in_type.map(item2 => {
            return {
              value: item2.id,
              text: item2.name,
            }
          })
          defaultStaff = item.staff_list.map(item2 => {
            return {
              value: item2.id,
              text: item2.name,
            }
          })
        }
        return {
          value: item.store_id,
          text: item.name,
          type: item.clock_in_type.map(item2 => {
            return {
              value: item2.id,
              text: item2.name,
            }
          }),
          staff: item.staff_list.map(item2 => {
            return {
              value: item2.id,
              text: item2.name,
            }
          }),
        }
      })
      this.clockInColumns = defaultClockInType
      this.staffColumns = defaultStaff
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('staff', ['staffArrivalRecord', 'getStoreAndClockInType']),

    _pickStartTime(data) {
      this.startTime = this.$moment(data).format('YYYY-MM-DD')
    },
    _pickEndTime(data) {
      this.endTime = this.$moment(data).format('YYYY-MM-DD')
    },
    _changeOption(data) {
      let store = this.storeColumns.find(item => {
        if (item.value === data) {
          return item
        }
      })
      this.clockInColumns = store.type
      this.staffColumns = store.staff
      this.store_id = data
      this.clock_type = '0'
      this.staff_id = '0'
      this._onRefresh()
    },
    _changeClockIn(data) {
      this.clock_type = data
      this._onRefresh()
    },
    _changeStaff(data) {
      this.staff_id = data
      this._onRefresh()
    },
    // 刷新商品列表
    _onRefresh() {
      this.staffArrivalRecord({
        page: 1,
        store_id: this.store_id,
        staff_id: this.staff_id,
        type: this.clock_type,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.page = 2
        this.list = res
        this.refreshing = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.finished = false
        }
      })
    },
    // 异步更新商品数据
    _onLoad() {
      this.staffArrivalRecord({
        page: this.page,
        store_id: this.store_id,
        staff_id: this.staff_id,
        type: this.clock_type,
        begin_time: this.startTime,
        end_time: this.endTime,
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res)
      })
    },
    _search() {
      this._onRefresh()
      this.$refs.item.toggle()
    },
    _getType(type) {
      let label = '店铺没有此类型打卡 - ' + type
      this.clockInColumns.forEach(item => {
        if (item.value == type) {
          label = item.text
        }
      })
      return label
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.van-dropdown-menu__title {
  font-size: 14px;
}
</style>
