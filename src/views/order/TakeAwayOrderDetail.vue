<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="外卖订单详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="订单信息">
      <van-cell :value="detail.order_id" title="订单编号"></van-cell>
      <van-cell :value="detail.fetch_number" title="取单编号" v-if="detail.fetch_number !== '0'"></van-cell>
      <van-cell :value="detail.real_orderid" title="流水号"></van-cell>
      <van-cell :value="detail.create_time" title="下单时间"></van-cell>
      <van-cell :value="detail.expect_use_time" title="期望送达时间"></van-cell>
      <van-cell :value="detail.order_from_txt" title="订单来源"></van-cell>
      <van-cell :value="detail.username" title="收货人名称"></van-cell>
      <van-cell :value="detail.userphone" title="收货人电话"></van-cell>
      <van-cell :value="detail.register_phone" title="注册电话"></van-cell>
      <van-cell :value="detail.goods_type === '0' ? '实体商品订单' : '虚拟商品订单'" title="订单类型"></van-cell>
      <van-cell :value="detail.note" title="用户备注"></van-cell>
    </van-cell-group>
    <van-cell-group title="配送信息">
      <van-cell :value="detail.deliver_str" title="配送方式"></van-cell>
      <van-cell :value="detail.address" title="收货地址"></van-cell>
    </van-cell-group>
    <van-cell-group title="商品信息">
      <div :key="index" v-for="(item, index) in commodityList">
        <van-cell :key="index2" :title="item2.name" class="commodity-item" v-for="(item2, index2) in item.list">
          <span>x{{ item2.num }}</span>
          <span>¥{{ item2.total }}</span>
          <span>¥{{ item2.discount_price }}</span>
        </van-cell>
      </div>
      <van-cell :title="pack_alias" :value="`¥${detail.packing_charge}`"></van-cell>
      <van-cell :title="freight_alias" :value="`¥${detail.freight_charge}`"></van-cell>
      <van-cell :title="`订单 ¥${detail.discount_price}`" :value="`优惠  - ¥${detail.minus_price}`"></van-cell>
    </van-cell-group>
    <van-cell-group title="支付信息">
      <van-cell :value="detail.pay_time" title="支付时间"></van-cell>
      <van-cell :value="detail.pay_type_str" title="支付方式"></van-cell>
      <van-cell :value="detail.change_price > 0 ? detail.price : `¥${detail.go_pay_price}`" title="应收总额"></van-cell>
      <van-cell :value="`${detail.minus_card_discount > 0 ? '- ' : ''}¥${detail.minus_card_discount}`" title="商家会员卡折扣"></van-cell>
      <van-cell :value="`${detail.balance_pay > 0 ? '- ' : ''}¥${detail.balance_pay}`" title="系统余额支付"></van-cell>
    </van-cell-group>
    <van-row :gutter="10" class="operator">
      <van-col
        span="12"
        v-if="
          detail.status === '0' &&
            detail.paid === '1' &&
            (detail.is_pick_in_store === '1' || detail.is_pick_in_store === '2') &&
            detail.is_open_pick === '1'
        "
      >
        <van-button @click="_controlSelfMentionPointPicker">分配自提点</van-button>
      </van-col>
      <van-col
        span="12"
        v-if="detail.status === '0' && detail.paid === '1' && detail.order_from !== '1' && detail.order_from !== '6'"
      >
        <van-button @click="_takeAwayOrders">接单</van-button>
      </van-col>
      <van-col span="12" v-if="detail.paid === '1' && detail.status === '7'">
        <van-button @click="_sendGoodsToSelfMentionPoin">发货到自提</van-button>
      </van-col>
      <van-col
        span="12"
        v-if="
          detail.is_pick_in_store === '3' &&
            detail.status !== '4' &&
            detail.status !== '5' &&
            detail.paid === '1' &&
            detail.user_confirm === '0'
        "
      >
        <van-button @click="_controlConfirmPopup" type="primary">发货</van-button>
      </van-col>
      <van-col
        span="12"
        v-if="
          (detail.is_pick_in_store === '1' || detail.is_pick_in_store === '2') &&
            detail.status !== '2' &&
            detail.status !== '3' &&
            detail.status !== '4' &&
            detail.status !== '5' &&
            detail.paid === '1' &&
            detail.sure
        "
      >
        <van-button @click="_confirmConsumption" type="primary">确认消费</van-button>
      </van-col>
      <van-col
        span="12"
        v-if="
          detail.status !== '2' &&
            detail.status !== '3' &&
            detail.status !== '4' &&
            detail.status !== '5' &&
            detail.sure
        "
      >
        <van-button @click="_cancelOrder(detail.order_id)" type="danger">取消订单</van-button>
      </van-col>
    </van-row>
    <!-- 弹出层 -->
    <!-- 分配自提点 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showSelfMentionPointPicker">
      <van-picker
        :columns="selfMentionPointColumns"
        @cancel="_controlSelfMentionPointPicker"
        @confirm="_pickSelfMentionPoint"
        show-toolbar
        value-key="name"
      ></van-picker>
    </van-popup>
    <!-- 快递列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showExpressPicker">
      <van-picker
        :columns="expressColumns"
        :default-index="expressIndex"
        @cancel="_controlExpressPicker"
        @confirm="_pickExpress"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 发货 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showConfirmPopup">
      <van-cell-group>
        <van-field :value="detail.address" autosize input-align="right" label="地址" readonly type="textarea"></van-field>
        <van-field :value="`${detail.distance}km`" input-align="right" label="距离" readonly right-icon="location-o"></van-field>
        <van-field
          :value="expressLabel"
          @click="_controlExpressPicker"
          input-align="right"
          is-link
          label="快递"
          placeholder="请选择"
          readonly
        ></van-field>
        <van-field input-align="right" label="快递单号" placeholder="请输入快递单号" v-model="expressNo"></van-field>
      </van-cell-group>
      <van-button @click="_deliverGoods" type="primary">确认发货</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'takeAwayOrderDetail',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      detail: {},
      showSelfMentionPointPicker: false,
      showExpressPicker: false,
      showConfirmPopup: false,
      loading: false,
      express: '',
      expressNo: '',
      pack_alias: '',
      freight_alias: '',
      commodityList: [],
      selfMentionPointColumns: [],
      expressColumns: [],
    }
  },

  computed: {
    expressLabel() {
      const item = this.expressColumns.find(item => item.value === this.express)
      return item && item.label
    },
    expressIndex() {
      const index = this.expressColumns.findIndex(item => item.value === this.express)
      return index
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._readTakeAwayOrderDetail()
    // 获取自提点列表
    this._getTakeAwaySelfMentionPoinList()
    // 获取支持的快递
    this._getTakeAwayExpressList()
  },

  destroyed() {},

  methods: {
    ...mapActions('order', [
      'readTakeAwayOrderDetail',
      'getTakeAwaySelfMentionPoinList',
      'dispatchSelfMentionPoint',
      'takeAwayOrders',
      'takeAwayConfirmConsumption',
      'getTakeAwayExpressList',
      'deliverGoods',
      'sendGoodsToSelfMentionPoin',
      'cancelTakeAwayOrder',
    ]),
    // 分配自提点开关
    _controlSelfMentionPointPicker() {
      this.showSelfMentionPointPicker = !this.showSelfMentionPointPicker
    },
    // 确认发货开关
    _controlConfirmPopup() {
      this.showConfirmPopup = !this.showConfirmPopup
    },
    // 快递开关
    _controlExpressPicker() {
      this.showExpressPicker = !this.showExpressPicker
    },
    // 选择快递
    _pickExpress(data) {
      this.express = data.value
      this._controlExpressPicker()
    },
    // 分配自提点
    _pickSelfMentionPoint(data) {
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      this.dispatchSelfMentionPoint({
        order_id: id,
        pick_id: data.pick_addr_id,
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._readTakeAwayOrderDetail()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 发货到自提点
    _sendGoodsToSelfMentionPoin() {
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认发货到自提点？',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.sendGoodsToSelfMentionPoin(id)
                .then(() => {
                  this.$toast.success({
                    message: '操作成功',
                    duration: 800,
                    onClose: () => {
                      // 解锁
                      this.loading = false
                      this._readTakeAwayOrderDetail()
                    },
                  })
                  done()
                })
                .catch(() => {
                  this.loading = false
                  done()
                })
            } else {
              this.loading = false
              done()
            }
          },
        })
        .catch(err => {
          this.loading = false
        })
    },
    // 读取订单详情
    _readTakeAwayOrderDetail() {
      const { id } = this.$route.params
      this.readTakeAwayOrderDetail(id).then(res => {
        this.detail = res.order_details
        this.expressNo = res.order_details.express_number
        this.pack_alias = res.pack_alias
        this.freight_alias = res.freight_alias
        this.commodityList = res.info
      })
    },
    //  获取外卖自提点列表
    _getTakeAwaySelfMentionPoinList() {
      const { id } = this.$route.params
      this.getTakeAwaySelfMentionPoinList(id).then(res => {
        this.selfMentionPointColumns = res.pick_list
      })
    },
    // 获取支持的快递
    _getTakeAwayExpressList() {
      this.getTakeAwayExpressList().then(res => {
        this.expressColumns = res
        this.express = res[0].value
      })
    },
    // 外卖接单
    _takeAwayOrders() {
      if (this.loading) return
      this.loading = true
      this.takeAwayOrders(this.detail.order_id)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._readTakeAwayOrderDetail()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 取消订单
    _cancelOrder() {
      if (this.loading) return
      this.loading = true
      this.$dialog
        .confirm({
          title: '提示',
          message: '确认取消此订单？',
          beforeClose: (action, done) => {
            if (action === 'confirm') {
              this.cancelTakeAwayOrder(this.detail.order_id)
                .then(() => {
                  this.$toast.success({
                    message: '操作成功',
                    duration: 800,
                    onClose: () => {
                      // 解锁
                      this.loading = false
                      this._readTakeAwayOrderDetail()
                    },
                  })
                  done()
                })
                .catch(() => {
                  this.loading = false
                  done()
                })
            } else {
              this.loading = false
              done()
            }
          },
        })
        .catch(() => {})
    },
    // 发货
    _deliverGoods() {
      if (!this.expressLabel || !this.expressNo) {
        this.$notify({
          type: 'warning',
          message: '请填写快递单号',
        })
        return
      }
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      this.deliverGoods({
        order_id: id,
        express_number: this.expressNo,
        express_id: this.express,
      })
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              // 解锁
              this.loading = false
              this._controlConfirmPopup()
              this._readTakeAwayOrderDetail()
            },
          })
        })
        .catch(() => {
          this.loading = false
        })
    },
    // 确认消费
    _confirmConsumption() {
      if (this.detail.deliver_str === '自提') {
        this.$scanQRCode()
          .then(code => {
            this.takeAwayConfirmConsumption(code).then(() => {
              this.$toast.success({
                message: '操作成功',
                duration: 800,
                onClose: () => {
                  this._readTakeAwayOrderDetail()
                },
              })
            })
          })
          .catch(() => {
            this.$toast.success({
              message: '核销码错误，核销失败',
              forbidClick: true,
              duration: 1500,
            })
          })
      } else {
        if (this.loading) return
        this.loading = true
        this.$dialog
          .confirm({
            title: '提示',
            message: '确认消费后，订单将设为已消费且不能恢复，请确认用户收货后再操作！',
            beforeClose: (action, done) => {
              if (action === 'confirm') {
                this.takeAwayConfirmConsumption(this.detail.order_id)
                  .then(() => {
                    this.$toast.success({
                      message: '操作成功',
                      duration: 800,
                      onClose: () => {
                        // 解锁
                        this.loading = false
                        this._readTakeAwayOrderDetail()
                      },
                    })
                    done()
                  })
                  .catch(() => {
                    this.loading = false
                    done()
                  })
              } else {
                this.loading = false
                done()
              }
            },
          })
          .catch(() => {
            this.loading = false
          })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.operator {
  margin: 0 !important;
  padding: 10px 10px 0 10px;
  .van-col {
    .van-button {
      margin-bottom: 10px;
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

.commodity-item {
  .van-cell__value {
    & > span:nth-child(2) {
      text-decoration: line-through;
    }
    & > span {
      margin: 0 4px;
    }
  }
}

.red-font {
  .van-cell__value {
    color: @red-c;
  }
}
</style>
