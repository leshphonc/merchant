<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => $router.push('/smartScreen/smartScreenPosterCRU')"
      fixed
      left-arrow
      right-text="创建"
      title="机器人推广列表"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_eOnRefresh" v-model="eRefreshing">
      <van-list :finished="eFinished" :finished-text="eFinishText" @load="_eOnLoad" v-model="loading">
        <div :key="item.id" v-for="item in eList">
          <van-panel>
            <div>
              <!-- <van-row>
                    <van-col span="10">触达人数：{{ item.reach || 111 }}</van-col>
                    <van-col span="10">播报次数：{{ item.scan || 111 }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                  <van-row>
                    <van-col span="10">浏览人数：{{ item.wait || 111 }}</van-col>
                    <van-col span="10">下单人数：{{ item.buy || 111 }}</van-col>
                  </van-row>-->
              <div class="white-space"></div>
              <van-row>
                <van-col span="5">关键词：</van-col>
                <van-col span="19">{{ item.keywords }}</van-col>
              </van-row>
              <div class="white-space"></div>
              <!-- <van-row>
                    <van-col span="5">推广分类：</van-col>
                    <van-col span="19">{{ item.cate_name }}</van-col>
                  </van-row>
                  <div class="white-space"></div>
                  <van-row>
                    <van-col span="5">推广标签：</van-col>
                    <van-col span="19">{{ item.label_names.join() }}</van-col>
                  </van-row>-->
              <div class="white-space"></div>
              <van-row>
                <van-col span="5">播报语音：</van-col>
                <van-col span="19">{{ item.read_txt }}</van-col>
              </van-row>
              <div class="white-space"></div>
            </div>
            <template #header>
              <van-row class="panel-row">
                <van-col span="6">
                  <van-image :src="item.data_type === '0' ? item.ad_img : item.goods_info.goods_icon" />
                </van-col>
                <van-col span="12">
                  <div>{{ item.data_type === '0' ? item.title : item.goods_info.goods_name }}</div>
                  <div>{{ _currentDesc(item) }}</div>
                </van-col>
                <van-col span="6">
                  <div>{{ _currentStatus(item) }}</div>
                  <div>{{ item.local_push == 1 ? '本店已推' : '本店未推' }}</div>
                </van-col>
              </van-row>
            </template>
            <div slot="footer">
              <van-button
                @click="_deletePoster(item.id)"
                size="small"
                type="danger"
                v-if="item.local_push != '1' && (item.around_push != '1' || item.around_push != '2')"
              >
                删除
              </van-button>
              <!-- <van-button disabled size="small" v-if="item.audit === '2'">同城审核中</van-button> -->
              <van-button
                @click="_needCheckStore(item)"
                size="small"
                type="primary"
                v-if="
                  item.local_push == 1 &&
                    (item.around_push == '0' || item.around_push == '3' || item.around_push == '4')
                "
              >
                同城发布
              </van-button>
              <van-button @click="_cancelAroundAuth(item.id)" size="small" type="danger" v-if="item.around_push == '1'">
                取消同城审核
              </van-button>
              <van-button @click="_cancelAroundAuth(item.id)" size="small" type="danger" v-if="item.around_push == '2'">
                取消同城发布
              </van-button>

              <van-button @click="_openPopup(item)" size="small" type="primary" v-if="item.local_push == '0'">
                本店发布
              </van-button>

              <van-button
                @click="_cancelReleaseLocal(item.id)"
                size="small"
                type="danger"
                v-if="item.local_push == '1' && item.around_push != '1' && item.around_push != '2'"
              >
                取消本店发布
              </van-button>

              <van-button @click="$router.push(`/smartScreen/smartScreenPromotionStatistics/${item.id}`)" size="small">
                推广统计
              </van-button>

              <van-button
                :to="`/smartScreen/smartScreenPosterCRU/${item.id}`"
                size="small"
                v-if="item.local_push != '1' && (item.around_push != '1' || item.around_push != '2')"
              >
                编辑
              </van-button>
            </div>
          </van-panel>
          <div class="white-space"></div>
        </div>
      </van-list>
    </van-pull-refresh>
    <!-- 弹出层 -->
    <!-- 选择推广屏幕 -->
    <van-popup class="full-popup" position="bottom" safe-area-inset-bottom v-model="showPopup">
      <div>
        <van-steps :active="curStep">
          <van-step>选择屏幕</van-step>
          <!-- <van-step>选择需求</van-step> -->
          <van-step>推广角色</van-step>
          <van-step>推广时间</van-step>
        </van-steps>
        <van-checkbox-group v-model="formData.screen" v-show="curStep === 0">
          <van-cell-group>
            <van-cell
              :key="index"
              :label="item.address"
              :title="`${item.remark} - ${item.store_name}`"
              @click="_sToggle(index)"
              clickable
              v-for="(item, index) in screenList"
            >
              <van-checkbox :name="item.imax_id" ref="checkboxesS" slot="right-icon" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <!-- <div v-show="curStep === 1">
        <van-checkbox-group v-model="formData.guest_demand_ids">
          <van-cell-group>
            <van-cell
              :key="index"
              :title="item.name"
              @click="_dToggle(index)"
              clickable
              v-for="(item, index) in demandList"
            >
              <van-checkbox :name="item.id" ref="checkboxesD" slot="right-icon" />
            </van-cell>
          </van-cell-group>
        </van-checkbox-group>
        <van-field
          :value="guestType"
          @click="_controlGuestTypePicker"
          clickable
          input-align="right"
          label="客人数量"
          placeholder="点击选择"
          readonly
        />
        <van-field input-align="right" label="人数" v-if="formData.guest_num_type === '1'">
          <van-stepper slot="input" v-model="formData.guest_num" />
        </van-field>
        <van-field input-align="right" label="最少人数" v-if="formData.guest_num_type === '2'">
          <van-stepper :max="formData.guest_num_max - 0" slot="input" v-model="formData.guest_num_min" />
        </van-field>
        <van-field input-align="right" label="最多人数" v-if="formData.guest_num_type === '2'">
          <van-stepper :min="formData.guest_num_min - 0 + 1" slot="input" v-model="formData.guest_num_max" />
        </van-field>
      </div>-->
        <div v-show="curStep === 1">
          <van-field label="推广角色" name="role">
            <template #input>
              <van-checkbox-group direction="horizontal" v-model="formData.role">
                <van-checkbox :key="index" :name="item.id" v-for="(item, index) in roleList">
                  {{ item.name }}
                </van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field label="推广会员" name="promotion_role_member" v-if="formData.role.indexOf(5) > -1">
            <template #input>
              <van-checkbox-group direction="horizontal" v-model="formData.promotion_role_member">
                <van-checkbox :key="index" :name="item.id" v-for="(item, index) in memberList">
                  {{ item.name }}
                </van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field label="推广店员" name="promotion_role_staff" v-if="formData.role.indexOf(6) > -1">
            <template #input>
              <van-checkbox-group direction="horizontal" ref="checkboxGroup" v-model="formData.promotion_role_staff">
                <van-checkbox :key="index" :name="item.id" v-for="(item, index) in staffList">
                  {{ item.name }}
                </van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-button
            @click="_toggleAll"
            size="small"
            style="float: right; margin-right: 8px;margin-top: 4px;"
            type="info"
            v-if="formData.role.indexOf(6) > -1"
          >
            全部取消
          </van-button>
          <van-button
            @click="_checkAll"
            size="small"
            style="float: right; margin-right: 8px;margin-top: 4px;"
            type="primary"
            v-if="formData.role.indexOf(6) > -1"
          >
            全选
          </van-button>
        </div>
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
          v-show="curStep === 2"
        ></time-picker>
      </div>
      <div class="btn-group">
        <van-button @click="_closePopup" native-type="button" v-show="curStep === 0">取消</van-button>
        <van-button @click="curStep -= 1" v-show="curStep > 0">上一步</van-button>
        <van-button @click="_nextStep" type="primary" v-show="curStep < 2">下一步</van-button>
        <van-button @click="_submit" type="primary" v-show="curStep === 2">发布到屏幕</van-button>
      </div>
    </van-popup>
    <!-- 同城发布店铺选择 -->
    <van-popup
      :lazy-render="false"
      class="cus-popup"
      position="bottom"
      safe-area-inset-bottom
      v-model="showStorePicker"
    >
      <van-checkbox-group v-model="serviceScope">
        <!-- <van-cell-group title="请选择提供此商品的店铺">
          <van-cell
            :key="index"
            :label="item.adress"
            :title="item.label"
            @click="_storeToggle(index)"
            clickable
            v-for="(item, index) in storeColumns"
          >
            <van-checkbox :name="item.value" ref="checkboxesStore" slot="right-icon" />
          </van-cell>
        </van-cell-group>-->
        <van-cell-group>
          <van-cell
            :key="index"
            :title="item.name"
            @click="_ssToggle(index)"
            clickable
            v-for="(item, index) in demandList"
          >
            <van-checkbox :name="item.id" ref="checkboxesSS" slot="right-icon" />
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div class="btn-group">
        <van-button @click="_controlStorePicker()" native-type="button">取消</van-button>
        <van-button @click="_submitSameCity" type="primary">发布到同城</van-button>
      </div>
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showAroundPushPopup" class="aroundPopup">
      <van-cell-group title="同城推广时的产品售价">
        <van-field v-model="around_price" label="产品价格" type="number" required placeholder="请输入价格" />
      </van-cell-group>
      <van-cell-group title="分给同城销售员的佣金">
        <van-field v-model="spread_fee" label="推广佣金" type="number" required placeholder="不能为负数" />
      </van-cell-group>

      <div class="btn-group">
        <van-button @click="_controlAroundPushPopup()" native-type="button">取消</van-button>
        <van-button @click="_submitSameCity" type="primary">发布到同城</van-button>
      </div>
    </van-popup>
    <!-- 客人数量类型选则 -->
    <!-- <van-popup position="bottom" safe-area-inset-bottom v-model="showGuestTypePicker">
      <van-picker
        :columns="guestTypeColumns"
        :default-index="statusIndex"
        @cancel="_controlGuestTypePicker"
        @confirm="_pickGuestType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup> -->
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
        id: '',
        role: [],
        screen: [],
        start_time: '07:00',
        end_time: '20:59',
        promotion_role_staff: [],
        promotion_role_member: [],
        // guest_num: '',
        // guest_num_type: '0',
        // guest_num_min: '',
        // guest_num_max: '',
        // guest_demand_ids: [],
      },
      curStep: 0,
      screenList: [],
      roleList: [],
      memberList: [],
      staffList: [],
      demandList: [],
      ePage: 1,
      eList: [],
      eRefreshing: false,
      eFinished: false,
      loading: false,
      showPopup: false,
      showStorePicker: false,
      storeColumns: [],
      lastAd: '',
      serviceScope: [],
      // guestTypeColumns: [
      //   {
      //     label: '不限',
      //     value: '0',
      //   },
      //   {
      //     label: '固定人数',
      //     value: '1',
      //   },
      //   {
      //     label: '人数区间',
      //     value: '2',
      //   },
      // ],
      // showGuestTypePicker: false,
      showAroundPushPopup: false,
      around_price: '',
      spread_fee: '',
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
    eFinishText() {
      return this.eList.length ? '没有更多了' : '暂无推广内容'
    },
    guestType() {
      const item = this.guestTypeColumns.find(item => item.value === this.formData.guest_num_type)
      return item && item.label
    },
  },

  watch: {},

  created() {},

  mounted() {
    this.getSmartScreenList().then(res => {
      this.screenList = res
    })
    this.getSmartScreenRoleList().then(res => {
      this.roleList = res
    })
    this.getSmartScreenMemberList().then(res => {
      this.memberList = res.lists
    })
    this.getSmartScreenStaffList().then(res => {
      this.staffList = res
    })
    this.getStoreList().then(res => {
      this.storeColumns = res.store_list
    })
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList', 'getFilterStoreList']),
    ...mapActions('smartScreen', [
      'getSmartScreenList',
      'getSmartScreenPosterList',
      'changePosterRelease',
      'deletePoster',
      'getSmartScreenRoleList',
      'getSmartScreenMemberList',
      'getSmartScreenStaffList',
      'getSmartScreenDemandList',
      'getSmartScreenInPoster',
      'localPush',
      'cancelLocalPush',
      'aroundPush',
      'cancelAroundPush',
    ]),
    // 店铺选择开关
    _controlStorePicker(id) {
      this.showStorePicker = !this.showStorePicker
      if (id) {
        this.lastAd = id
        this.serviceScope = []
      } else {
        this.lastAd = ''
      }
    },
    _controlAroundPushPopup() {
      this.showAroundPushPopup = !this.showAroundPushPopup
    },
    _checkAll() {
      this.$refs.checkboxGroup.toggleAll(true)
    },
    _toggleAll() {
      this.$refs.checkboxGroup.toggleAll(false)
    },
    // 选择推广屏幕
    async _openPopup(item) {
      this.formData.id = item.id
      this.formData.guest_num = item.guest_num
      this.formData.role = item.to_user_ids.map(i => {
        return i - 0
      }) // 角色
      this.formData.promotion_role_staff = item.promotion_role_staff
        ? item.promotion_role_staff.split(',').map(i => {
            return i
          })
        : [] // 店员
      this.formData.promotion_role_member = item.promotion_role_member
        ? item.promotion_role_member.split(',').map(i => {
            return i
          })
        : [] // 会员

      // this.formData.guest_num = item.guest_num
      // this.formData.guest_num_type = item.guest_num_type
      // this.formData.guest_num_min = item.guest_num_min
      // this.formData.guest_num_max = item.guest_num_max
      // this.formData.guest_demand_ids = item.guest_demand_ids ? item.guest_demand_ids.split(',') : []

      item.time_start && (this.formData.start_time = item.time_start)
      if (item.time_end && item.time_start !== item.time_end) {
        item.time_end && (this.formData.end_time = item.time_end)
      }
      await this.getSmartScreenInPoster(item.id).then(res => {
        this.formData.screen = res
      })
      this.showPopup = true
    },
    _cancelReleaseLocal(id) {
      if (this.loading) return
      this.loading = true
      this.$dialog
        .confirm({
          title: '确认信息',
          message: '确认取消店铺内的推广吗？',
        })
        .then(() => {
          this.cancelLocalPush(id)
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
        })
        .catch(() => {
          // on cancel
        })
    },
    _closePopup() {
      this.formData = {
        id: '',
        role: [],
        screen: [],
        start_time: '07:00',
        end_time: '20:59',
        promotion_role_staff: [],
        promotion_role_member: [],
        // guest_num: '',
        // guest_num_type: '0',
        // guest_num_min: '',
        // guest_num_max: '',
        // guest_demand_ids: [],
      }
      this.curStep = 0
      this.showPopup = false
    },

    // 刷新列表
    _eOnRefresh() {
      this.getSmartScreenPosterList({
        page: 1,
      }).then(res => {
        this.ePage = 2
        this.eList = res
        this.eRefreshing = false
        if (res.length < 10) {
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
      }).then(res => {
        this.loading = false
        if (res.length < 10) {
          this.eFinished = true
        } else {
          this.ePage += 1
        }
        this.eList.push(...res)
      })
    },
    // 屏幕选择
    _sToggle(index) {
      this.$refs.checkboxesS[index].toggle()
    },
    // 需求选择
    _dToggle(index) {
      this.$refs.checkboxesD[index].toggle()
    },
    // 角色选择
    _rToggle(index) {
      this.$refs.checkboxesR[index].toggle()
    },
    // 角色选择
    _mToggle(index) {
      this.$refs.checkboxesM[index].toggle()
    },
    // 角色选择
    _stToggle(index) {
      this.$refs.checkboxesST[index].toggle()
    },
    // 同城发布店铺选择
    _storeToggle(index) {
      this.$refs.checkboxesStore[index].toggle()
    },
    _ssToggle(index) {
      this.$refs.checkboxesSS[index].toggle()
    },
    // 同城发布
    _changeRelease(id) {
      if (this.around_price < 0 || this.spread_fee < 0) {
        this.$toast('金额不能小于0')
        return
      }
      if (this.loading) return
      this.loading = true
      this.aroundPush({ id, spread_fee: this.spread_fee, around_price: this.around_price })
        .then(() => {
          this.$toast.success({
            message: '同城发布成功，待审核',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._eOnRefresh()
              if (this.showAroundPushPopup) {
                this._controlAroundPushPopup()
              }
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _cancelAroundAuth(id) {
      if (this.loading) return
      this.loading = true
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认取消同城发布吗',
        })
        .then(() => {
          // on confirm
          this.cancelAroundPush({ id })
            .then(() => {
              this.$toast.success({
                message: '取消成功',
                forbidClick: true,
                duration: 1500,
                onClose: () => {
                  // 解锁
                  this.loading = false
                  this._eOnRefresh()
                  // if (this.showStorePicker) {
                  //   this._controlStorePicker()
                  // }
                },
              })
            })
            .catch(() => {
              this.loading = false
            })
        })
        .catch(() => {
          // on cancel
          this.loading = false
        })
    },
    _deletePoster(id) {
      if (this.loading) return
      this.loading = true
      this.$dialog
        .confirm({
          title: '确认信息',
          message: '确认删除此条推广内容？（不可恢复）',
        })
        .then(() => {
          this.deletePoster(id)
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
        })
        .catch(() => {
          // on cancel
        })
    },
    _currentStatus(item) {
      var str = ''
      switch (item.around_push) {
        case '0':
          str = '同城未推'
          break
        case '1':
          str = '同城正在审核'
          break
        case '2':
          str = '同城已推'
          break
        case '3':
          str = '同城审核不通过'
          break
        case '4':
          str = '平台下架'
          break
      }
      return str
    },
    _currentDesc(item) {
      let str = ''
      if (item.data_type === '0') {
        str = '海报'
      } else {
        switch (item.goods_type) {
          case '0':
            str = '零售商品'
            break
          case '1':
            str = '团购商品'
            break
          case '2':
            str = '服务商品'
            break
          // case '3':
          //   str = '次卡'
          //   break
          case '4':
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
    _needCheckStore(item) {
      this.lastAd = item.id
      this._controlAroundPushPopup()
      // 1 商品
      // if (item.data_type === '1') {
      //   this.getSmartScreenDemandList(this.formData.screen).then(res => {
      //     this.demandList = res
      //   })
      //   this.getFilterStoreList({
      //     goods_type: item.goods_type,
      //     goods_id: item.goods_id,
      //   }).then(res => {
      //     const arr = res.map(item => {
      //       return {
      //         label: item.name,
      //         value: item.store_id,
      //         adress: item.adress,
      //       }
      //     })
      //     this.storeColumns = arr
      //     this._controlStorePicker(item.id)
      //   })
      // } else {
      // 2 海报 （废弃）
      // this.getStoreList().then(res => {
      // this.storeColumns = res.store_list
      // this._controlStorePicker(item.id)
      // })
      // }
      // this._submitSameCity()
    },
    _submit() {
      const params = {
        id: this.formData.id,
        imax_ids: this.formData.screen.join(),
        role_ids: this.formData.role.join(),
        time_start: this.formData.start_time,
        time_end: this.formData.end_time,
        promotion_role_staff: this.formData.promotion_role_staff.join(),
        promotion_role_member: this.formData.promotion_role_member.join(),
        // guest_num: this.formData.guest_num,
        // guest_num_type: this.formData.guest_num_type,
        // guest_num_min: this.formData.guest_num_min,
        // guest_num_max: this.formData.guest_num_max,
        // guest_demand_ids: this.formData.guest_demand_ids.join(),
      }
      this.localPush(params).then(res => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1500,
          onClose: () => {
            // 解锁
            this.loading = false
            this._closePopup()
            this._eOnRefresh()
          },
        })
      })
    },
    // 选择店铺且将海报同城发布
    _submitSameCity() {
      this._changeRelease(this.lastAd)
    },
    _nextStep() {
      if (this.curStep === 0) {
        if (this.formData.screen.length === 0) {
          this.$toast('请选择推广店铺')
        } else {
          this.getSmartScreenDemandList(this.formData.screen).then(res => {
            this.demandList = res
            this.curStep += 1
          })
        }
      } else if (this.curStep === 1) {
        // if (this.formData.guest_demand_ids.length === 0) {
        //   this.$toast('请选择用户需求')
        // } else {
        //   this.curStep += 1
        // }
        if (this.formData.role.indexOf(5) > -1 && this.formData.promotion_role_member.length === 0) {
          this.$toast('请选择推广会员身份')
          return
        }
        if (this.formData.role.indexOf(6) > -1 && this.formData.promotion_role_staff.length === 0) {
          this.$toast('请选择推广店员身份')
          return
        }
        if (this.formData.role.length === 0) {
          this.$toast('请选择推广角色')
          return
        }
        this.curStep += 1
      } else if (this.curStep === 2) {
        this.curStep += 1
      } else {
        this.curStep += 1
      }
    },
    // _pickGuestType(item) {
    //   this.formData.guest_num_type = item.value
    //   this._controlGuestTypePicker()
    // },
    // _controlGuestTypePicker() {
    //   this.showGuestTypePicker = !this.showGuestTypePicker
    // },
  },
}
</script>

<style lang="less" scoped>
.panel-row {
  padding: 10px 16px;
  .van-col:nth-child(2) {
    padding-left: 10px;
    div:nth-child(1) {
      font-size: 14px;
      color: @black-light-c;
    }
    div:nth-child(2) {
      color: @gray-deep-c;
      font-size: 12px;
      margin-top: 4px;
    }
  }
  .van-col:nth-child(3) {
    div:nth-child(1) {
      font-size: 14px;
      color: @red-c;
    }
    div:nth-child(2) {
      color: @gray-deep-c;
      font-size: 12px;
      margin-top: 4px;
    }
  }
}
.van-panel__content {
  padding: 10px 16px;
  font-size: 13px;
  color: @font-gray-c;
}

.van-panel__footer {
  text-align: right;
}

.full-popup {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  box-sizing: border-box;
  padding-bottom: 44px;
  .btn-group {
    width: 100%;
    z-index: 10;

    .van-button {
      width: 50%;
      margin: 0;
    }
  }

  /deep/.van-collapse-item__content {
    padding: 0;
  }
}

.cus-popup {
  max-height: 100vh;
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
}

.question-icon {
  height: 24px;
  line-height: 24px;
  margin-right: 6px;
}

.van-checkbox--horizontal {
  margin-bottom: 4px;
}

.disable-panel {
  .van-icon {
    width: 100px;
    height: 100px;
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.aroundPopup {
  background: #eee;
  .btn-group {
    margin-top: 200px;
    width: 100%;
    .van-button {
      width: 50%;
      margin: 0;
    }
  }
}
</style>
