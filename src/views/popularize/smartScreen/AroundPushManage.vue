<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="goList"
      fixed
      left-arrow
      right-text="选择"
      title="当前推广内容"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky>
      <van-dropdown-menu style="z-index: 5">
        <van-dropdown-item v-model="value1" :options="option1" @change="changeRobot" />
        <van-dropdown-item v-model="value2" :options="option2" @change="changeCommodity" />
      </van-dropdown-menu>
    </van-sticky>

    <van-pull-refresh @refresh="onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="onLoad" v-model="loading">
        <div :key="item.id" v-for="item in list">
          <van-panel
            :title="item.title"
            :desc="item.read_txt"
            :icon="item.ad_img"
            :status="item.union_status == 1 ? '已失效' : ''"
          >
            <template #footer>
              <div>
                <van-row>
                  <van-col :span="24">所属商家：{{ item.mer_name }}</van-col>
                  <van-col :span="12">
                    推广佣金：
                    <span class="red">{{ item.spread_fee }}</span>
                    元
                  </van-col>
                  <van-col :span="12">
                    商品售价：
                    <span class="red">{{ item.around_price }}</span>
                    元
                  </van-col>
                  <van-col :span="24">关键词：{{ item.keywords }}</van-col>
                </van-row>
              </div>
              <div style="text-align: right;margin-top:4px;">
                <van-button
                  size="small"
                  :disabled="item.union_status == 1"
                  type="primary"
                  @click="preViewRobotList(item)"
                >
                  查看推广机器人
                </van-button>
              </div>
            </template>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="show" style="width: 70vw">
      <van-cell-group title="推广位置">
        <van-cell v-for="item in curRobotList" :key="item.imax_id" :title="item.imax_name" :label="item.store_name" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import api from '@/api/popularize/smartScreen'
export default {
  name: 'AroundPushManage',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      size: 10,
      list: [],
      imax_id: '',
      guest_demand_id: '',
      value1: '',
      value2: '',
      option1: [{ text: '全部设备', value: '' }],
      option2: [{ text: '全部商品', value: '' }],
      refreshing: false,
      finished: false,
      loading: false,
      show: false,
      curRobotList: [],
    }
  },

  computed: {
    finishText() {
      return this.list.length ? '没有更多了' : ''
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getSmartScreenList().then(res => {
      var arr = [
        { text: '全部设备', value: '' },
        ...res.map(item => {
          return {
            text: item.remark,
            value: item.id,
          }
        }),
      ]
      this.option1 = arr
    })
    api.getSelectNeedList().then(res => {
      this.needList = res
      var arr = [
        { text: '全部需求', value: '' },
        ...res.map(item => {
          return {
            text: item.name,
            value: item.cat_id,
          }
        }),
      ]
      this.option2 = arr
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getSmartScreenList']),
    goList() {
      this.$router.push('/smartScreen/aroundPushList')
    },
    onRefresh() {
      api
        .getSelectedUnion({
          guest_demand_id: this.value2,
          imax_id: this.value1,
          page: 1,
          size: this.size,
        })
        .then(res => {
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
    onLoad() {
      api
        .getSelectedUnion({
          guest_demand_id: this.value2,
          imax_id: this.value1,
          page: this.page,
          size: this.size,
        })
        .then(res => {
          this.loading = false
          if (res.length < 10) {
            this.finished = true
          } else {
            this.page += 1
          }
          this.list.push(...res)
        })
    },
    preViewRobotList(item) {
      this.curRobotList = item.imaxList
      this.show = true
    },
    changeRobot() {
      this.onRefresh()
    },
    changeCommodity() {
      this.onRefresh()
    },
  },
}
</script>

<style lang="less" scoped>
.van-cell__left-icon,
.van-cell__right-icon {
  height: auto;
}
.van-icon__image {
  width: 80px;
  height: 80px;
}

.van-panel__footer {
  .van-row {
    div {
      margin: 2px 0;
      font-size: 13px;
      color: #444;
    }
  }
}

.red {
  color: red;
}
</style>
