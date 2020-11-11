<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="同城联盟推广列表"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky>
      <van-dropdown-menu style="z-index: 5">
        <van-dropdown-item v-model="value1" :options="option1" @change="changeCommodity" />
        <van-dropdown-item v-model="value2" :options="option2" @change="changeSort" />
      </van-dropdown-menu>
    </van-sticky>

    <van-pull-refresh @refresh="onRefresh" v-model="refreshing">
      <van-list :finished="finished" :finished-text="finishText" @load="onLoad" v-model="loading">
        <div :key="item.id" v-for="item in list">
          <van-panel
            :title="item.title"
            :desc="item.read_txt"
            :icon="item.ad_img"
            :status="getNeedName(item.guest_demand_ids)"
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
                <van-button size="small" type="primary" @click="showChoose(item)" :disabled="item.selected == 1">
                  {{ item.selected == 1 ? '已推广' : '推广此产品' }}
                </van-button>
              </div>
            </template>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <van-popup v-model="show" position="bottom" safe-area-inset-bottom style="padding-top:10px;">
      <div class="gray-title">请勾选机器人</div>
      <van-checkbox-group v-model="robot">
        <van-cell
          v-for="(item, index) in robotList"
          clickable
          :key="item.id"
          :label="`${item.store_name} - ${item.address}`"
          :title="item.remark"
          @click="toggle(index)"
        >
          <template #right-icon>
            <van-checkbox :name="item.id" ref="checkboxes" />
          </template>
        </van-cell>
      </van-checkbox-group>
      <van-button block @click="chooseProduct" type="primary" style="margin-top:20px;">推广</van-button>
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
      value1: '',
      value2: '',
      option1: [{ text: '全部需求', value: '' }],
      option2: [
        { text: '默认排序', value: '' },
        { text: '佣金最高', value: 'a' },
        { text: '售价最高', value: 'b' },
        { text: '售价最低', value: 'c' },
      ],
      needList: [],
      refreshing: false,
      finished: false,
      loading: false,
      show: false,
      robot: [],
      robotList: [],
      curProduct: '',
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
      this.robotList = res
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', ['getSmartScreenList']),
    openPicker() {},
    changeCommodity() {
      this.onRefresh()
    },
    changeSort() {
      this.onRefresh()
    },
    onRefresh() {
      api
        .getUnSelectUnion({
          sort: this.value2,
          guest_demand_id: this.value1,
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
      if (!this.needList.length) {
        api.getAllNeedList().then(res => {
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
          this.option1 = arr
          api
            .getUnSelectUnion({
              sort: this.value2,
              guest_demand_id: this.value1,
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
        })
      } else {
        api
          .getUnSelectUnion({
            sort: this.value2,
            guest_demand_id: this.value1,
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
      }
    },
    getNeedName(id) {
      let result = ''
      var arr = id.split(',')
      arr.forEach(item => {
        const need = this.needList.find(item2 => {
          if (item == item2.cat_id) {
            return item2
          }
        })
        if (need) {
          if (!result) {
            result += need.name
          } else {
            result += ', ' + need.name
          }
        }
      })

      return result
    },
    showChoose(item) {
      this.show = true
      this.curProduct = item.id
    },
    chooseProduct() {
      api
        .selectUnion({
          id: this.curProduct,
          imax_ids: this.robot.join(','),
        })
        .then(res => {
          this.$toast.success('选择成功')
          this.show = false
          this.onRefresh()
        })
    },
    toggle(index) {
      this.$refs.checkboxes[index].toggle()
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

.gray-title {
  color: #777;
  padding-left: 10px;
  font-size: 13px;
}
</style>
