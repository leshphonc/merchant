<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => $router.push('/smartScreen/smartScreenPosterCRU')"
      fixed
      left-arrow
      right-text="创建"
      title="智能屏推广列表"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-tabs :offset-top="offsetTop" sticky v-model="active">
      <van-tab title="启用中">
        <van-pull-refresh @refresh="_eOnRefresh" v-model="eRefreshing">
          <van-list :finished="eFinished" :finished-text="eFinishText" @load="_eOnLoad" v-model="loading">
            <div :key="item.id" v-for="item in eList">
              <van-panel
                :desc="_currentDesc(item)"
                :icon="item.data_type === '0' ? item.ad_img : item.goods_info.image"
                :status="_currentStatus(item)"
                :title="item.data_type === '0' ? item.title : item.goods_info.name"
              >
                <div>
                  <van-row>
                    <van-col span="10">触达人数：{{ item.reach || 111 }}</van-col>
                    <van-col span="10">播报次数：{{ item.scan || 111 }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                  <van-row>
                    <van-col span="10">浏览人数：{{ item.wait || 111 }}</van-col>
                    <van-col span="10">下单人数：{{ item.buy || 111 }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                  <van-row>
                    <van-col span="5">关键词：</van-col>
                    <van-col span="19">{{ item.keywords }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                  <van-row>
                    <van-col span="5">播报语音：</van-col>
                    <van-col span="19">{{ item.read_txt }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                </div>
                <div slot="footer" v-if="item.is_shelves === '1'">
                  <van-button disabled size="small" v-if="item.audit === '2'">审核中</van-button>
                  <van-button @click="_changeRelease(item.id)" size="small" type="danger" v-else>取消发布</van-button>
                  <van-button @click="_openPopup(item)" size="small">选择推广屏幕</van-button>
                </div>
                <div slot="footer" v-else-if="item.is_shelves === '2'">
                  <van-button @click="_changeStatus(item.id)" size="small" type="danger">禁用</van-button>
                  <van-button @click="_changeRelease(item.id)" size="small" type="primary">同城发布</van-button>
                  <van-button @click="_openPopup(item)" size="small">选择推广屏幕</van-button>
                  <van-button :to="`/smartScreen/smartScreenPosterCRU/${item.id}`" size="small">编辑</van-button>
                </div>
              </van-panel>
              <div class="white-space"></div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="禁用中">
        <van-pull-refresh @refresh="_dOnRefresh" v-model="dRefreshing">
          <van-list :finished="dFinished" :finished-text="dFinishText" @load="_dOnLoad" v-model="loading">
            <div :key="item.id" v-for="item in dList">
              <van-panel
                :desc="_currentDesc(item)"
                :icon="item.data_type === '0' ? item.ad_img : item.goods_info.image"
                :status="_currentStatus(item)"
                :title="item.data_type === '0' ? item.title : item.goods_info.name"
              >
                <div>
                  <van-row>
                    <van-col span="10">触达人数：{{ item.reach || 111 }}</van-col>
                    <van-col span="10">播报次数：{{ item.scan || 111 }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                  <van-row>
                    <van-col span="10">浏览人数：{{ item.wait || 111 }}</van-col>
                    <van-col span="10">下单人数：{{ item.buy || 111 }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                  <van-row>
                    <van-col span="5">关键词：</van-col>
                    <van-col span="19">{{ item.keywords }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                  <van-row>
                    <van-col span="5">播报语音：</van-col>
                    <van-col span="19">{{ item.read_txt }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                </div>
                <div slot="footer">
                  <van-button @click="_changeStatus(item.id)" size="small" type="primary">启用</van-button>
                </div>
              </van-panel>
              <div class="white-space"></div>
            </div>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <!-- 弹出层 -->
    <!-- 选择推广屏幕 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showPopup">
      <van-collapse v-model="activeNames">
        <van-collapse-item name="1" title="推广屏幕">
          <van-checkbox-group v-model="formData.screen">
            <van-cell-group>
              <van-cell
                :key="index"
                :label="item.address"
                :title="item.store_name"
                @click="_rToggle(index)"
                clickable
                v-for="(item, index) in screenList"
              >
                <van-checkbox :name="item.id" ref="checkboxesR" slot="right-icon" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
        <van-collapse-item name="2" title="推广角色">
          <van-checkbox-group v-model="formData.role">
            <van-cell-group>
              <van-cell
                :key="index"
                :title="item.name"
                @click="_sToggle(index)"
                clickable
                v-for="(item, index) in roleList"
              >
                <van-checkbox :name="item.id" ref="checkboxesS" slot="right-icon" />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-collapse-item>
        <time-picker
          :data="[formData.start_time, formData.end_time]"
          :pickEndTime="_pickCloseTime"
          :pickStartTime="_pickOpenTime"
          endField="结束时间"
          endLabel="结束时间"
          showDefault
          startField="开始时间"
          startLabel="开始时间"
          type="time"
        ></time-picker>
      </van-collapse>

      <div class="btn-group">
        <van-button @click="_closePopup" native-type="button">取消</van-button>
        <van-button @click="_submit" type="primary">确认</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import TimePicker from '@/components/TimePicker'

export default {
  name: 'smartScreenPoster',

  mixins: [],

  components: {
    TimePicker,
  },

  props: {},

  data() {
    return {
      formData: {
        ad_id: '',
        role: [],
        screen: [],
        start_time: '07:00',
        end_time: '20:59',
      },
      active: 0,
      activeNames: ['1', '2'],
      screenList: [],
      roleList: [],
      list: [1, 2, 3, 4, 5, 6, 7, 8],
      ePage: 1,
      eList: [],
      eRefreshing: false,
      eFinished: false,
      dPage: 1,
      dList: [],
      dRefreshing: false,
      dFinished: false,
      loading: false,
      showPopup: false,
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    eFinishText() {
      return this.eList.length ? '没有更多了' : '暂无推广内容'
    },
    dFinishText() {
      return this.dList.length ? '没有更多了' : '暂无推广内容'
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getSmartScreenList().then(res => {
      console.log(res)
      this.screenList = res
    })
    this.getSmartScreenRoleList().then(res => {
      this.roleList = res
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('smartScreen', [
      'getSmartScreenList',
      'getSmartScreenPosterList',
      'changePosterRelease',
      'changePosterStatus',
      'getSmartScreenRoleList',
      'bindPosterToSmartScreen',
      'getSmartScreenInPoster',
    ]),
    async _openPopup(item) {
      this.formData.role = item.to_user_ids
      this.formData.ad_id = item.id
      item.time_start && (this.formData.start_time = item.time_start)
      if (item.time_start !== item.time_end) {
        item.time_end && (this.formData.end_time = item.time_end)
      }
      await this.getSmartScreenInPoster(item.id).then(res => {
        this.formData.screen = res
      })
      console.log(item)
      this.showPopup = true
    },
    _closePopup() {
      this.showPopup = false
    },
    // 刷新列表
    _eOnRefresh() {
      this.getSmartScreenPosterList({
        page: 1,
        status: '1',
      }).then(res => {
        this.ePage = 2
        this.eList = res.lists
        this.eRefreshing = false
        if (res.lists.length < 10) {
          this.eFinished = true
        } else {
          this.eFinished = false
        }
      })
    },
    // 异步更新数据
    _eOnLoad() {
      this.getSmartScreenPosterList({
        page: this.ePage,
        status: '1',
      }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.eFinished = true
        } else {
          this.ePage += 1
        }
        this.eList.push(...res.lists)
      })
    },
    // 刷新列表
    _dOnRefresh() {
      this.getSmartScreenPosterList({
        page: 1,
        status: '0',
      }).then(res => {
        this.dPage = 2
        this.dList = res.lists
        this.dRefreshing = false
        if (res.lists.length < 10) {
          this.dFinished = true
        } else {
          this.dFinished = false
        }
      })
    },
    // 异步更新数据
    _dOnLoad() {
      this.getSmartScreenPosterList({
        page: this.dPage,
        status: '0',
      }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.dFinished = true
        } else {
          this.dPage += 1
        }
        this.dList.push(...res.lists)
      })
    },
    _rToggle(index) {
      this.$refs.checkboxesR[index].toggle()
    },
    _sToggle(index) {
      this.$refs.checkboxesS[index].toggle()
    },
    _changeRelease(id) {
      if (this.loading) return
      this.loading = true
      this.changePosterRelease(id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._eOnRefresh()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _changeStatus(id) {
      if (this.loading) return
      this.loading = true
      this.changePosterStatus(id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._eOnRefresh()
              this._dOnRefresh()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _currentStatus(item) {
      if (item.is_shelves === '2') {
        if (item.audit === '9') {
          return '未上架'
        } else if (item.audit === '3') {
          return '审核失败'
        } else if (item.audit === '2') {
          return '未发布'
        } else {
          return '未上架'
        }
      } else if (item.audit === '1') {
        return '审核成功'
      } else if (item.audit === '2') {
        return '审核中'
      }
    },
    _currentDesc(item) {
      let str = ''
      if (item.data_type === '0') {
        str = '海报'
      } else {
        switch (item.goods_type) {
          case '0':
            str = '电商商品'
            break
          case '1':
            str = '团购商品'
            break
          case '2':
            str = '服务商品'
            break
          case '3':
            str = '套餐商品'
            break
          default:
            break
        }
      }
      return str
    },
    _pickOpenTime(data) {
      this.formData.start_time = data
    },
    _pickCloseTime(data) {
      this.formData.end_time = data
    },
    _submit() {
      const params = {
        ad_id: this.formData.ad_id,
        imax_ids: this.formData.screen.join(),
        role_ids: this.formData.role.join(),
        time_start: this.formData.start_time,
        time_end: this.formData.end_time,
      }
      console.log(params)
      this.bindPosterToSmartScreen(params).then(res => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1500,
          onClose: () => {
            // 解锁
            this.loading = false
            this._closePopup()
            this._eOnRefresh()
            this.formData = {
              ad_id: '',
              role: [],
              screen: [],
              start_time: '07:00',
              end_time: '20:59',
            }
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-cell__left-icon {
  font-size: 80px;
  height: 80px;
}

.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}

.van-panel__footer {
  text-align: right;
}

.van-popup {
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 44px;
  .btn-group {
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-button {
      width: 50%;
      margin: 0;
    }
  }

  /deep/.van-collapse-item__content {
    padding: 0;
  }
}
</style>
