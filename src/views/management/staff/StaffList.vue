<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="() => $router.push('/staff/staffCRU')"
      fixed
      left-arrow
      right-text="创建"
      title="店员管理"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-sticky :offset-top="offsetTop">
      <div class="white-space"></div>
      <van-tabs @change="_changeTabs" type="card">
        <van-tab :disabled="loading" title="在岗"></van-tab>
        <van-tab :disabled="loading" title="离岗"></van-tab>
        <van-tab :disabled="loading" title="禁用"></van-tab>
      </van-tabs>
      <div class="white-space"></div>
    </van-sticky>
    <van-loading type="spinner" v-show="!list.length && loading"></van-loading>
    <div>
      <div :key="item.staff_id" class="bottom-space" v-for="item in list">
        <van-panel>
          <div slot="header">
            <van-row>
              <van-col span="12">
                <img :src="item.avatar ? item.avatar : require('@/assets/image/staffAvatar.png')" alt />
                <div style="display: inline-block">
                  <span class="name">
                    {{ item.name }}
                    <i class="iconfont icon-kf" v-if="item.is_kefu === '1'">&#xe638;</i>
                  </span>
                  <div class="tel">
                    <a :href="'tel:' + item.tel" v-if="item.tel">
                      {{ item.tel }}
                      <van-icon color="#1989fa" name="phone-o" />
                    </a>
                  </div>
                </div>
              </van-col>
              <van-col class="store" span="12">{{ item.storename }}</van-col>
            </van-row>
          </div>
          <div slot="footer">
            <div>
              <div style="display: flex;">
                <div style="flex: 1;">账号：{{ item.username }}</div>
                <div style="flex: 1;">销售报酬：{{ item.sale_money || 0 }} 元</div>
              </div>
              <div class="white-space"></div>
              <div style="display: flex;">
                <div style="flex: 1;">分佣比例：{{ item.spread_rato || 0 }}%</div>
              </div>
              <div class="white-space"></div>
              <div>
                最后登录：{{
                  item.last_time !== '0' ? $moment(item.last_time * 1000).format('YYYY-MM-DD HH:mm') : '暂无记录'
                }}
              </div>
            </div>
            <div class="white-space"></div>
            <div style="text-align: right;" v-if="item.name !== '门店AI助手-小由' && status === '1'">
              <van-button @click="_changeKF(item)" size="small" v-if="item.is_kefu === '1'">取消客服身份</van-button>
              <van-button @click="_changeKF(item)" size="small" v-else>设为客服</van-button>
              <van-button
                @click="_controlStorePicker(item.staff_id, item.store_id)"
                size="small"
                type="primary"
                v-if="item.is_kefu === '0'"
                >调岗</van-button
              >
              <van-button
                @click="_controlPermissionPicker(item.store_id, item.mer_id, item.staff_id)"
                size="small"
                type="primary"
                >权限</van-button
              >
              <van-button :to="`/staff/staffWorkRecord/${item.staff_id}`" size="small" type="primary"
                >工作记录</van-button
              >
              <van-button @click="_staffStatusChange(item.staff_id)" size="small" type="danger">禁用</van-button>
            </div>
            <div style="text-align: right;">
              <van-button @click="_staffStatusChange(item.staff_id)" size="small" type="primary" v-show="status === '2'"
                >启用</van-button
              >
            </div>
            <i
              @click="() => $router.push(`/staff/staffCRU/${item.staff_id}/${item.store_id}`)"
              class="iconfont icon-edit"
              >&#xe634;</i
            >
          </div>
        </van-panel>
        <div class="white-space"></div>
      </div>
    </div>
    <van-button @click="_staffLogin" class="staff-login" type="primary">店员登录</van-button>
    <!-- 弹出层 -->
    <!-- 店员权限 -->
    <van-popup class="permission-popup" position="bottom" safe-area-inset-bottom v-model="showPermissionPicker">
      <van-loading v-show="!permissionList.length" />
      <van-cell :key="item.id" :title="customPermissionList[item.id].name" v-for="item in permissionList">
        <van-switch :value="checked(item.id)" @change="_changePermission(item.id)" />
      </van-cell>
      <div class="btn-group">
        <van-button @click="_controlPermissionPicker">关闭</van-button>
        <van-button @click="_submit" type="primary">保存</van-button>
      </div>
    </van-popup>
    <!-- 店铺 -->
    <van-popup :lazy-render="false" position="bottom" safe-area-inset-bottom v-model="showStorePicker">
      <van-picker
        :columns="storeColumns"
        @cancel="_controlStorePicker"
        @confirm="_pickStore"
        ref="storePicker"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'staffList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      list: [],
      is_work: '1',
      status: '1',
      showPermissionPicker: false,
      showStorePicker: false,
      permissionList: [],
      permission: [],
      customPermissionList: {
        1: {
          page: 'carShop.html',
          name: '汽配订单',
        },
        2: {
          page: 'appoint.html',
          name: '预定订单',
        },
        3: {
          page: 'eCommerce.html',
          name: '零售订单',
        },
        4: {
          page: 'package.html',
          name: '套餐管理',
        },
        5: {
          page: 'clerkStatistics.html',
          name: '推广统计',
        },
        6: {
          page: 'write_off.html',
          name: '优惠券核销',
        },
        7: {
          page: 'activity.html',
          name: '联盟活动核销',
        },
        8: {
          page: 'store_qrcode.html',
          name: '收款二维码',
        },
        9: {
          page: 'billing.html',
          name: '开单收银',
        },
        10: {
          page: 'group_list.html',
          name: '团购订单',
        },
        11: {
          page: 'foodshop.html',
          name: '餐饮订单',
        },
        12: {
          page: 'hotel.html',
          name: '酒店管理',
        },
        13: {
          page: 'shop.html',
          name: '外卖订单',
        },
        14: {
          page: 'appoint_work_order.html',
          name: '预定工单',
        },
        15: {
          page: 'service.html',
          name: '服务工单',
        },
        16: {
          page: 'gift.html',
          name: '兑换订单',
        },
        17: {
          page: 'meet.html',
          name: '活动报名',
        },
        18: {
          page: 'retail.html',
          name: '卖场收银',
        },
      },
      lastStaff: '',
      loading: false,
      storeColumns: [],
    }
  },

  computed: {
    offsetTop() {
      return (46 / 375) * document.body.clientWidth
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getStaffList()
    this._getStoreList()
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('staff', [
      'getStaffList',
      'getAllStaffPermission',
      'getStaffPermission',
      'updateStaffPermission',
      'staffTransfer',
      'staffStatusChange',
      'staffKFStatusChange',
    ]),
    // 权限选择开关
    async _controlPermissionPicker(store_id, mer_id, staff_id) {
      this.permissionList = []
      this.showPermissionPicker = !this.showPermissionPicker
      if (store_id && mer_id && staff_id) {
        this.lastStaff = staff_id
        // 获取当前店铺全部权限
        const allPermission = await this.getAllStaffPermission({
          store_id,
          mer_id,
        })
        // 获取当前店员权限
        const permission = await this.getStaffPermission(staff_id)
        // 设置店当前员权限
        this.permission = permission.map(item => {
          return item.staff_menu_id
        })
        // 设置当前店铺全部权限
        this.permissionList = allPermission
      }
    },
    // 调岗开关
    _controlStorePicker(staff_id, store_id) {
      this.showStorePicker = !this.showStorePicker
      if (staff_id && store_id) {
        this.lastStaff = staff_id
        const index = this.storeColumns.findIndex(item => item.value === store_id)
        this.$refs.storePicker.setIndexes([index])
      }
    },
    // 店员调岗
    _pickStore(data) {
      this.staffTransfer({
        store_id: data.value,
        staff_id: this.lastStaff,
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 600,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getStaffList()
              this._controlStorePicker()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    _changeKF(item) {
      if (this.loading) return
      this.loading = true
      this.staffKFStatusChange({
        staff_id: item.staff_id,
        store_id: item.store_id,
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 600,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getStaffList()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 店员禁用启用
    _staffStatusChange(id) {
      if (this.loading) return
      this.loading = true
      this.staffStatusChange(id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 600,
            onClose: () => {
              // 解锁
              this.loading = false
              this._getStaffList()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 判断权限默认是否选中
    checked(id) {
      return this.permission.indexOf(id) > -1
    },
    // 切换权限选中状态
    _changePermission(id) {
      const index = this.permission.indexOf(id)
      if (index > -1) {
        this.permission.splice(index, 1)
      } else {
        this.permission.push(id)
      }
    },
    // 切换店员列表
    _changeTabs(data) {
      this.list = []
      switch (data) {
        case 0:
          this.is_work = '1'
          this.status = '1'
          this._getStaffList()
          break
        case 1:
          this.is_work = '2'
          this.status = '1'
          this._getStaffList()
          break
        case 2:
          this.is_work = ''
          this.status = '2'
          this._getStaffList()
          break
        default:
      }
    },
    // 店员登录
    _staffLogin() {
      window.location.href = window.location.origin + '/packapp/storestaff/login.html?back=index'
    },
    // 获取店铺列表
    _getStoreList() {
      this.getStoreList().then(res => {
        this.storeColumns = res.store_list
      })
    },
    // 获取店员列表
    _getStaffList() {
      this.loading = true
      this.getStaffList({ is_work: this.is_work, status: this.status }).then(res => {
        this.list = res
        this.loading = false
      })
    },
    // 修改店员权限
    _submit() {
      if (this.loading) return
      this.loading = true
      this.updateStaffPermission({
        staff_id: this.lastStaff,
        menu_id: JSON.stringify(
          this.permission.map(item => {
            return Number(item)
          })
        ),
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 600,
            onClose: () => {
              // 解锁
              this.loading = false
              this._controlPermissionPicker()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
  },
}
</script>

<style lang="less" scoped>
img {
  width: 40px;
  height: 40px;
  margin-right: 10px;
  vertical-align: bottom;
  border-radius: 40px;
}
.van-row {
  padding: 10px 16px;
  .van-icon {
    vertical-align: -2px;
  }
}

.name {
  font-size: 16px;
}

.tel {
  & > a {
    font-size: 14px;
    color: @font-gray-c !important;
  }
}

/deep/.van-sticky {
  background-color: @gray-background-c;
}

.store {
  color: @red-c;
  text-align: right;
  font-size: 14px;
}

.van-panel__footer {
  & > div {
    font-size: 14px;
    color: @black-light-c;
  }
}

.permission-popup {
  height: 100vh;
  padding-bottom: 44px;
  box-sizing: border-box;
  .btn-group {
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 10;

    .van-button {
      width: 50%;
      margin: 0;
    }
  }

  .van-loading {
    text-align: center;
    margin: 50% 0;
  }
}

.van-loading {
  text-align: center;
  margin: 50% 0;
}

.icon-edit {
  position: absolute;
  top: 10px;
  right: 10px;
  color: @black-c;
}

.icon-kf {
  font-size: 20px;
  color: @red-c;
  margin-left: 4px;
}

.bottom-space:last-child {
  margin-bottom: 48px;
}

.staff-login {
  width: 100%;
  position: fixed;
  bottom: 0px;
}
</style>
