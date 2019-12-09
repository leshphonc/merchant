<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="showActions = true"
      fixed
      left-arrow
      right-text="操作"
      title="优惠券列表"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <van-card
          :key="item.coupon_id"
          :num="item.num"
          :tag="category[item.cate_name]"
          :thumb="item.img"
          :title="item.name"
          v-for="item in list"
        >
          <div slot="tags">
            <van-tag plain type="danger">{{ item.cate_id }}</van-tag>
          </div>
          <div slot="bottom">{{ _getPlatform(item.platform) }}</div>
          <div slot="price">满{{ item.order_money }} 减{{ item.discount }}</div>
          <div slot="footer">
            <div class="white-space"></div>
            <div>
              有效期：{{ $moment(item.start_time * 1000).format('YYYY.MM.DD') }} -
              {{ $moment(item.end_time * 1000).format('YYYY.MM.DD') }}
            </div>
            <div class="white-space"></div>
            <van-button
              @click="_changeCouponStatus(item.coupon_id, '1')"
              size="small"
              type="primary"
              v-if="item.status === '0'"
              >启用</van-button
            >
            <van-button
              @click="_changeCouponStatus(item.coupon_id, '0')"
              size="small"
              type="danger"
              v-if="item.status === '1'"
              >禁用</van-button
            >
            <van-button size="small" v-if="item.status === '2'">超过期限</van-button>
            <van-button size="small" v-if="item.status === '3'">领完了</van-button>
            <van-button @click="_controlCouponList(item.coupon_id)" size="small"
              >已领取{{ item.had_pull }}张</van-button
            >
            <van-button :to="`/member/memberCouponCRU/${item.coupon_id}`" size="small" type="primary">编辑</van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
    <!-- 弹出层 -->
    <!-- 核销码列表 -->
    <van-popup
      :style="{ minHeight: '20%', paddingBottom: 44 }"
      position="bottom"
      safe-area-inset-bottom
      v-model="showCouponList"
    >
      <van-pull-refresh @refresh="_onRefresh2" v-model="refreshing2">
        <van-list :finished="finished2" :finished-text="finishText" @load="_onLoad2" v-model="loading">
          <van-panel
            :class="{ isUsed: item.is_use !== '1' }"
            :icon="item.avatar"
            :key="item.id"
            :status="item.is_use === '1' ? '已使用' : '未使用'"
            :title="item.name"
            v-for="item in list2"
          >
            <div>
              <div class="white-space"></div>
              <div>
                {{ item.nickname }}
                <a :href="'tel:' + item.phone" v-if="item.phone">
                  - {{ item.phone }}
                  <van-icon color="#1989fa" name="phone-o" />
                </a>
              </div>
              <div class="white-space"></div>
              <div>领取数量：{{ item.num }}</div>
              <div class="white-space"></div>
            </div>
            <div slot="footer">
              <div>领取时间：{{ $moment(item.receive_time * 1000).format('YYYY-MM-DD HH:mm') }}</div>
              <van-button @click="_controlWriteOff(item.id)" size="small" type="primary" v-if="item.is_use === '0'"
                >核销</van-button
              >
              <van-button disabled size="small" v-else>已核销</van-button>
            </div>
          </van-panel>
        </van-list>
      </van-pull-refresh>
      <van-row>
        <van-col span="24">
          <van-button @click="_controlCouponList(0)">关闭</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <!-- 核销码确认核销 -->
    <van-dialog
      @confirm="_writeOffCoupon"
      confirm-button-text="确认核销"
      show-cancel-button
      title="核销"
      v-model="showWriteOff"
    >
      <van-field input-align="center" placeholder="请填写核销码进行核销" type="number" v-model="code"></van-field>
    </van-dialog>
    <van-action-sheet :actions="actions" @select="_selectActions" v-model="showActions" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Utils from '@/utils'
export default {
  name: 'collarCouponMemberList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      refreshing: false,
      finished: false,
      page2: 1,
      list2: [],
      refreshing2: false,
      finished2: false,
      loading: false,
      category: {},
      platform: {},
      showCouponList: false,
      showWriteOff: false,
      showActions: false,
      actions: [{ name: '创建优惠券' }, { name: '派发优惠券' }, { name: '扫码核销优惠券' }],
      lastCoupon: 0,
      lastCouponItem: '',
      code: '',
    }
  },

  computed: {
    offsetTop() {
      return (8 / 375) * document.body.clientWidth
    },
    finishText() {
      return this.list2.length ? '没有更多了' : '暂无记录'
    },
  },

  watch: {},

  created() {
    window['_writeOffCoupon'] = this._writeOffCoupon
  },

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('member', ['getCouponList', 'changeCouponStatus', 'getCouponReceivedList', 'writeOffCoupon']),
    // 优惠券列表开关
    _controlCouponList(id) {
      if (id) {
        this.lastCoupon = id
        this.getCouponReceivedList({ coupon_id: id, page: 1 }).then(res => {
          this.page2 = 2
          this.list2 = res.lists
          this.refreshing2 = false
          this.showCouponList = !this.showCouponList
        })
      } else {
        this.showCouponList = !this.showCouponList
      }
    },
    // 核销码开关
    _controlWriteOff(id) {
      this.lastCouponItem = id
      this.showWriteOff = !this.showWriteOff
    },
    // 刷新列表
    _onRefresh() {
      this.getCouponList().then(res => {
        this.page = 2
        this.list = res.lists
        this.category = res.category
        this.platform = res.platform
        this.refreshing = false
        this.finished = false
      })
    },
    // 加载更多
    _onLoad() {
      this.getCouponList(this.page).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
        this.category = res.category
        this.platform = res.platform
      })
    },
    // 刷新列表
    _onRefresh2() {
      this.getCouponReceivedList({ coupon_id: this.lastCoupon, page: 1 }).then(res => {
        this.page2 = 2
        this.list2 = res.lists
        this.refreshing2 = false
        this.finished2 = false
      })
    },
    // 加载更多
    _onLoad2() {
      this.getCouponReceivedList({ coupon_id: this.lastCoupon, page: this.page2 }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished2 = true
        } else {
          this.page2 += 1
        }
        this.list2.push(...res.lists)
      })
    },
    // 获得平台名称
    _getPlatform(data) {
      if (data) {
        return data
          .map(item => {
            return this.platform[item]
          })
          .join()
      }
    },
    // 修改优惠券状态
    _changeCouponStatus(id, status) {
      if (this.loading) return
      this.loading = true
      this.changeCouponStatus({ coupon_id: id, status })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._onRefresh()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 扫码核销
    _scanCodeWriteOff() {
      if (this._isApp) {
        const json = { callback: '_writeOffCoupon', action: 'ScanQRCode' }
        this.$invokeAndroid(json)
      } else {
        this.$scanQRCode()
          .then(code => {
            // 接口返回值是一个完整url，所以使用utils取出code进行核销
            const _code = Utils.getUrlParam('code', code)
            this._writeOffCoupon(_code)
          })
          .catch(() => {
            this.$toast.fail({
              message: '核销码错误，核销失败',
              forbidClick: true,
              duration: 1500,
            })
          })
      }
    },
    // 输入核销码进行核销
    _writeOffCoupon(code) {
      this.writeOffCoupon(code || `${this.lastCouponItem}d${this.code}`)
        .then(() => {
          this.code = ''
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              this._onRefresh2()
            },
          })
        })
        .catch(() => {
          this.code = ''
        })
    },
    // 右上角操作
    _selectActions(item, index) {
      switch (index) {
        case 0:
          this.$router.push('/member/memberCouponCRU')
          break
        case 1:
          this.$router.push('/member/memberCouponDistribute')
          break
        case 2:
          this._scanCodeWriteOff()
          break
        default:
          break
      }
      this.showActions = false
    },
  },
}
</script>

<style lang="less" scoped>
.van-popup {
  box-sizing: border-box;
  background-color: @gray-background-c;

  .van-panel + .van-panel {
    margin-top: 6px;
  }

  .van-cell__left-icon,
  .van-cell__right-icon {
    height: auto;
    .van-icon__image {
      width: 4rem;
      height: 4rem;
    }
  }

  .isUsed {
    .van-panel__header-value {
      color: @green-c;
    }
  }

  .van-panel__content {
    padding: 2px 16px;
    font-size: 14px;
    color: @black-c;

    a {
      color: @black-c !important;
    }

    .van-icon {
      vertical-align: -2px;
    }
  }

  .van-panel__footer {
    & > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      & > div:first-child {
        font-size: 12px;
        color: @font-gray-c;
      }
    }
  }
  .van-row {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    .van-col {
      .van-button {
        width: 100%;
      }
    }
  }
}
</style>
