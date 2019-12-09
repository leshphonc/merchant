<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="预定订单详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-panel
      :desc="detail.phone"
      :status="detail.appoint_type === '1' ? '上门服务' : '到店服务'"
      :title="detail.nickname"
    >
      <div slot="footer">
        <van-row>
          <van-col span="12">
            <div>预约项目：</div>
            <div>{{ detail.order_name }}</div>
          </van-col>
          <van-col span="12">
            <div>预约时间：</div>
            <div>{{ detail.appoint_date }}</div>
          </van-col>
        </van-row>
        <div class="white-space"></div>
        <van-row>
          <van-col class="inline" span="12" v-if="detail.car_license">
            <div>预约车牌：</div>
            <div>{{ detail.car_license }}</div>
          </van-col>
          <van-col class="inline" span="12" v-if="detail.p_chexingmingcheng">
            <div>预约车型：</div>
            <div>{{ detail.p_chexingmingcheng }}</div>
          </van-col>
          <van-col class="inline" span="12" v-if="detail.appoint_envo">
            <div>预约工位：</div>
            <div>{{ detail.appoint_envo }}</div>
          </van-col>
          <van-col class="inline" span="12" v-if="detail.content">
            <div>留言：</div>
            <div>{{ detail.content }}</div>
          </van-col>
          <van-col class="inline" span="12" v-if="detail.product_detail">
            <div>选择预约详情：</div>
            <div>
              <span>名称：{{ detail.product_detail.name }}</span>
              <span>价格：{{ detail.product_detail.price }}</span>
            </div>
          </van-col>
        </van-row>
        <van-row>
          <van-col class="inline">
            <div>服务状态：</div>
            <div>{{ _serviceStatus(detail) }}</div>
          </van-col>
        </van-row>
      </div>
    </van-panel>
    <van-cell-group title="订单信息">
      <van-cell :value="detail.order_id" title="订单编号"></van-cell>
      <van-cell :value="detail.order_time" title="下单时间"></van-cell>
      <div v-if="detail.product_payment_price > 0 || detail.payment_money > 0">
        <van-cell
          :value="detail.product_id > 0 ? detail.product_payment_price : detail.payment_money"
          title="预付定金"
        ></van-cell>
        <van-cell :value="detail.paid === '0' ? '未支付' : '已支付'" title="支付状态"></van-cell>
      </div>
      <van-cell
        :value="detail.product_id > 0 ? detail.product_price : detail.appoint_price"
        title="订单总价"
      ></van-cell>
      <van-cell :value="detail.service_status > 0 ? '已支付' : '未支付'" title="支付状态"></van-cell>
      <van-cell :value="detail.merchant_balance" title="使用商户余额" v-if="detail.merchant_balance > 0"></van-cell>
      <van-cell
        :value="`-¥${detail.score_deducte} （使用${detail.score_used_count}）积分`"
        title="定金积分抵扣"
        v-if="detail.score_deducte > 0"
      ></van-cell>
      <van-cell
        :value="`-¥${detail.balance_pay - 0 + (detail.product_balance_pay - 0)}`"
        title="余额支付金额"
        v-if="
          detail.is_initiative && detail.service_status && detail.balance_pay - 0 + (detail.product_balance_pay - 0) > 0
        "
      ></van-cell>
      <van-cell
        :value="`-¥${detail.product_real_payment_price - 0 + (detail.product_real_balace_price - 0)}`"
        title="实际支付金额"
        v-if="detail.product_real_payment_price - 0 + (detail.product_real_balace_price - 0) > 0"
      ></van-cell>
      <van-cell
        :value="`-¥${detail.product_balance_pay}`"
        title="余额支付金额"
        v-if="detail.is_initiative && detail.service_status && detail.product_balance_pay > 0"
      ></van-cell>
      <van-cell
        :value="`-¥${detail.product_real_payment_price}`"
        title="实际支付金额"
        v-if="detail.product_real_payment_price > 0"
      ></van-cell>
      <van-cell :value="`-¥${detail.balance_pay}`" title="余额支付金额" v-if="detail.balance_pay > 0"></van-cell>
      <van-cell :value="`-¥${detail.pay_money}`" title="实际支付金额" v-if="detail.pay_money > 0"></van-cell>
      <van-cell
        :value="`-¥${detail.product_card_give_money}`"
        title="余额商家赠送余额"
        v-if="detail.product_card_give_money > 0"
      ></van-cell>
      <van-cell
        :value="`-¥${detail.pay_money - 0 + (detail.balance_pay - 0) + (detail.score_deducte - 0)}`"
        title="实际支付定金"
        v-if="
          detail.product_id &&
            detail.paid === '1' &&
            detail.pay_time > 0 &&
            detail.pay_money - 0 + (detail.balance_pay - 0) + (detail.score_deducte - 0) > 0
        "
      ></van-cell>
      <div v-if="detail.user_pay_money - 0 + (detail.product_balance_pay - 0) > 0">
        <van-cell :value="`-¥${detail.balance_pay}`" title="实际支付余额" v-if="detail.pay_money > 0"></van-cell>
        <van-cell :value="`-¥${detail.user_pay_time}`" title="实际支付余额时间"></van-cell>
        <van-cell
          :value="`-¥${detail.product_score_deducte} (使用${detail.product_score_used_count}积分)`"
          title="实际支付积分金额"
          v-if="detail.product_score_deducte > 0"
        ></van-cell>
        <van-cell
          :value="`-¥${detail.product_score_deducte}`"
          title="实际支付系统优惠券金额"
          v-if="detail.product_coupon_price > 0"
        ></van-cell>
        <van-cell
          :value="`-¥${detail.product_card_price}`"
          title="实际支付商家优惠券金额"
          v-if="detail.product_card_price > 0"
        ></van-cell>
        <div v-if="detail.cue_list">
          <van-cell :key="index" :title="item.name" v-for="(item, index) in detail.cue_list">
            <div v-if="item.type === '2' && item.address !== undefined">
              <span>地址：{{ item.address }}</span>
              <span>{{ item.value }}</span>
            </div>
          </van-cell>
        </div>
      </div>
    </van-cell-group>
    <van-row
      :gutter="10"
      class="operator"
      v-if="(detail.service_status === '0' || detail.service_status === '3') && detail.is_del === '0'"
    >
      <van-col span="12" v-if="detail.merchant_worker_id !== '0'">
        <van-button @click="_controlServicerPicker">修改派单</van-button>
      </van-col>
      <van-col span="12" v-else>
        <van-button @click="_controlServicerPicker">派单</van-button>
      </van-col>
      <van-col span="12">
        <van-button @click="_controlVerifyPopup" type="primary">验证服务</van-button>
      </van-col>
    </van-row>
    <!-- 弹出层 -->
    <!-- 服务者 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showServicerPicker">
      <van-picker
        :columns="servicerColumns"
        :default-index="servicerIndex"
        @cancel="_controlServicerPicker"
        @confirm="_pickServicer"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 支付方式 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showPayTypePicker">
      <van-picker
        :columns="payTypeColumns"
        :default-index="payTYpeIndex"
        @cancel="_controlPayTypePicker"
        @confirm="_pickPayType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 验证服务者 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showVerifyPopup">
      <van-cell-group>
        <van-field
          :value="servicerLabel"
          @click="_controlServicerPicker"
          input-align="right"
          is-link
          label="服务者"
          placeholder="请选择"
          readonly
        ></van-field>
        <van-field
          :value="payTypeLabel"
          @click="_controlPayTypePicker"
          input-align="right"
          is-link
          label="支付方式"
          placeholder="请选择"
          readonly
        ></van-field>
        <van-field label="服务密码" placeholder="请输入服务密码" v-model="password"></van-field>
      </van-cell-group>
      <van-button @click="_confirmServer" type="primary">确定</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'reserveOrderDetail',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      detail: {},
      showServicerPicker: false,
      showPayTypePicker: false,
      showVerifyPopup: false,
      servicerColumns: [],
      payTypeColumns: [
        {
          label: '现金',
          value: '1',
        },
        {
          label: '微信',
          value: '2',
        },
        {
          label: '支付宝',
          value: '3',
        },
        {
          label: '刷卡',
          value: '4',
        },
        {
          label: '其他',
          value: '5',
        },
      ],
      servicer: '-1',
      payType: '1',
      password: '',
      loading: false,
    }
  },

  computed: {
    servicerLabel() {
      const item = this.servicerColumns.find(item => item.value === this.servicer)
      return item && item.label
    },
    servicerIndex() {
      const index = this.servicerColumns.findIndex(item => item.value === this.servicer)
      return index
    },
    payTypeLabel() {
      const item = this.payTypeColumns.find(item => item.value === this.payType)
      return item && item.label
    },
    payTYpeIndex() {
      const index = this.payTypeColumns.findIndex(item => item.value === this.payType)
      return index
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._readReserveOrderDetail()
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['readReserveOrderDetail', 'dispatchReserveOrder', 'verifyReserveOrder']),
    _controlServicerPicker() {
      this.showServicerPicker = !this.showServicerPicker
    },
    _controlVerifyPopup() {
      this.showVerifyPopup = !this.showVerifyPopup
    },
    _controlPayTypePicker() {
      this.showPayTypePicker = !this.showPayTypePicker
    },
    _pickPayType(data) {
      this.payType = data.value
      this._controlPayTypePicker()
    },
    _pickServicer(data) {
      if (this.showVerifyPopup) {
        this.servicer = data.value
        this._controlServicerPicker()
      } else {
        if (this.loading) return
        this.loading = true
        const { id } = this.$route.params
        this.dispatchReserveOrder({
          order_id: id,
          merchant_worker_id: data.value,
        })
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._readReserveOrderDetail()
              },
            })
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
    _readReserveOrderDetail() {
      const { id } = this.$route.params
      this.readReserveOrderDetail(id).then(res => {
        this.detail = res
        this.servicerColumns = res.merchant_worker_list
      })
    },
    _serviceStatus(item) {
      if (item.paid === '0') {
        if (item.service_status === '0') {
          if (item.supply_status === '1') return '未服务'
          if (item.supply_status === '2') return '服务中'
          if (item.supply_status === '3') return '已服务'
          return '未知'
        } else if (item.service_status === '1') {
          return '已服务'
        } else if (item.service_status === '2') {
          return '已评价'
        }
        return '未知'
      } else if (item.paid === '1') {
        if (item.service_status === '0') {
          if (item.supply_status === '1') return '未服务'
          if (item.supply_status === '2') return '服务中'
          if (item.supply_status === '3') return '已服务'
          return '未知'
        } else if (item.service_status === '1') {
          return '已服务'
        } else if (item.service_status === '2') {
          return '已评价'
        } else if (item.service_status === '3') {
          return '已付款，已服务'
        }
        return '未知'
      } else if (item.paid === '2') {
        return '已退款'
      } else if (item.paid === '3') {
        return '用户已取消'
      } else {
        return '订单异常'
      }
    },
    _confirmServer() {
      if (!this.password) {
        this.$notify({
          type: 'warning',
          message: '请填写服务密码',
        })
        return
      }
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      this.verifyReserveOrder({
        order_id: id,
        merchant_worker_id: this.servicer,
        merchant_pay_type: this.payType,
        appoint_pass: this.password,
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._controlVerifyPopup()
              this._readReserveOrderDetail()
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
.van-col {
  & > div:first-child {
    font-size: 14px;
    color: @font-gray-c;
  }
  & > div:last-child {
    font-size: 13px;
    color: @black-c;
  }
}

.inline {
  & > div {
    display: inline-block;
  }
}

.operator {
  padding: 10px;
  .van-col {
    .van-button {
      width: 100%;
    }
  }
}

.van-popup {
  background-color: @gray-background-c;
  .van-button {
    margin-top: 300px;
    width: 100%;
  }
}
</style>
