<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="礼品订单"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-pull-refresh @refresh="_onRefresh" v-model="refreshing">
      <van-list :finished="finished" @load="_onLoad" finished-text="没有更多了" v-model="loading">
        <van-card
          :key="item.gift_id"
          :thumb="item.wap_pic_list[0].image"
          :title="item.gift_name"
          lazy-load
          v-for="item in list"
        >
          <div slot="tags">
            <div>订单数量：{{ item.num }}</div>
            <div>状态：{{ _getStatusLabel(item) }}</div>
            <div>创建时间：{{ $moment(item.order_time * 1000).format('YYYY-MM-DD HH:mm') }}</div>
          </div>
          <div slot="footer">
            <van-button @click="_controlOrderDetail(item.order_id)" size="small">详情</van-button>
            <van-button @click="_controlWriteOff(item.order_id)" size="small" type="primary">核销</van-button>
          </div>
        </van-card>
      </van-list>
    </van-pull-refresh>
    <!-- 弹出层 -->
    <!-- 订单详情 -->
    <van-popup class="detail-popup" position="bottom" safe-area-inset-bottom v-model="showOrderDetailPopup">
      <div class="list">
        <van-cell-group>
          <van-cell :value="orderDetail.order_id" title="订单编号" />
          <van-cell :value="orderDetail.gift_name" title="金币商城商品" />
        </van-cell-group>
        <van-cell-group title="订单信息">
          <van-cell
            :value="orderDetail.exchange_type === '0' ? `纯${orderDetail.score_name}` : orderDetail.score_name"
            title="兑换类型"
          />
          <van-cell title="订单类型" value="实物" />
          <van-cell :value="_getStatusLabel2()" title="订单状态" />
          <van-cell :value="orderDetail.num" title="数量" />
          <van-cell :value="`${orderDetail.worth}元`" title="结算价" />
          <van-cell :value="$moment(orderDetail.order_time * 1000).format('YYYY-MM-DD HH:mm')" title="下单时间" />
        </van-cell-group>
        <van-cell-group title="用户信息">
          <van-cell :value="orderDetail.uid" title="用户ID" />
          <van-cell :value="orderDetail.nickname" title="用户昵称" />
          <van-cell :value="orderDetail.phone" title="订单手机号" />
          <van-cell :value="orderDetail.user_phone" title="用户手机号" />
        </van-cell-group>
        <van-cell-group title="配送信息">
          <van-cell :value="orderDetail.contact_name" title="收货人" />
          <van-cell :value="orderDetail.phone" title="联系电话" />
          <van-cell
            :value="orderDetail.delivery_type ? deliveryType[orderDetail.delivery_type].label : ''"
            title="配送要求"
          />
          <van-cell :value="orderDetail.zipcode" title="邮编" />
          <van-cell :value="orderDetail.address" title="收货地址" />
        </van-cell-group>
      </div>
      <van-button @click="_controlOrderDetail()">关闭</van-button>
    </van-popup>
    <!-- 核销信息 -->
    <van-popup class="write-off-popup" position="bottom" safe-area-inset-bottom v-model="showWriteOffPopup">
      <van-panel title="核销信息">
        <div slot="footer">
          <van-row :key="item.gift_pass" align="center" justify="space-between" type="flex" v-for="item in giftCodeArr">
            <van-col span="16">核销码：{{ item.gift_pass }}</van-col>
            <van-col span="8" style="text-align: right;">
              <van-button size="small" v-if="item.status === '1'">已核销</van-button>
            </van-col>
          </van-row>
        </div>
      </van-panel>
      <div class="btn-group">
        <van-button @click="_controlWriteOff()">关闭</van-button>
        <van-button @click="_scanCodeWriteOff()" type="primary">扫码核销</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'giftOrderList',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      page: 1,
      list: [],
      refreshing: false,
      finished: false,
      loading: false,
      showOrderDetailPopup: false,
      showWriteOffPopup: false,
      orderDetail: {},
      giftCodeArr: [],
      deliveryType: [
        { label: '', value: '0' },
        { label: '工作日、双休日与假日均可送货', value: '1' },
        { label: '只工作日送货', value: '2' },
        { label: '只双休日、假日送货', value: '3' },
        { label: '白天没人，其它时间送货', value: '4' },
      ],
    }
  },

  computed: {},

  watch: {},

  created() {
    window['_writeOffGift'] = this._writeOffGift
  },

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('gift', ['getGiftOrderList', 'getGiftOrderDetail', 'getGiftWriteOffCode', 'WriteOffGift']),
    _controlOrderDetail(id) {
      if (id) {
        this.getGiftOrderDetail(id).then(res => {
          this.orderDetail = res
          this.showOrderDetailPopup = !this.showOrderDetailPopup
        })
      } else {
        this.showOrderDetailPopup = !this.showOrderDetailPopup
      }
    },
    _controlWriteOff(id) {
      if (id) {
        this.getGiftOrderDetail(id).then(res => {
          this.orderDetail = res
          if (res.pass_array === '1') {
            this.getGiftWriteOffCode(id).then(res => {
              this.giftCodeArr = res.pass_array
              this.showWriteOffPopup = !this.showWriteOffPopup
            })
          } else {
            this.giftCodeArr = [
              {
                gift_pass: res.gift_pass,
              },
            ]
            this.showWriteOffPopup = !this.showOrderDetailPopup
          }
        })
      } else {
        this.showWriteOffPopup = !this.showWriteOffPopup
      }
    },
    // 刷新列表
    _onRefresh() {
      const { id } = this.$route.params
      this.getGiftOrderList({ page: 1, gift_id: id }).then(res => {
        this.page = 2
        this.list = res.lists
        this.refreshing = false
        this.finished = false
      })
    },
    // 异步更新数据
    _onLoad() {
      const { id } = this.$route.params
      this.getGiftOrderList({ page: this.page, gift_id: id }).then(res => {
        this.loading = false
        if (res.lists.length < 10) {
          this.finished = true
        } else {
          this.page += 1
        }
        this.list.push(...res.lists)
      })
    },
    _getStatusLabel(item) {
      let str = ''
      if (item.is_pick_in_store === '1') {
        if (item.status === '1') {
          str = '已完成'
        } else {
          str = '未完成'
        }
      } else {
        if (item.paid === '1') {
          str = '已支付'
        } else {
          str = '未支付'
        }
        if (item.status === '1') {
          str += ' 已发货'
        } else {
          str += ' 未发货'
        }
      }
      return str
    },
    _getStatusLabel2() {
      if (this.orderDetail.status === '2') {
        return '已完成'
      } else if (this.orderDetail.paid === '1') {
        return '已支付'
      } else {
        return '未支付'
      }
    },
    _scanCodeWriteOff() {
      if (this._isApp) {
        const json = { callback: '_writeOffGift', action: 'ScanQRCode' }
        this.$invokeAndroid(json)
      } else {
        this.$scanQRCode()
          .then(code => {
            this._writeOffGift(code)
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
    _writeOffGift(code) {
      this.WriteOffGift({ order_id: this.orderDetail.order_id, gift_pass: code }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1500,
          onClose: () => {
            this._controlWriteOff()
          },
        })
      })
    },
  },
}
</script>

<style lang="less" scoped>
.detail-popup {
  background-color: @gray-background-c;
  .list {
    height: 80vh;
    padding-bottom: 44px;
    overflow: scroll;
  }
  .van-button {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}

.write-off-popup {
  background-color: @gray-background-c;
  .van-panel {
    padding-bottom: 44px;
  }
  .van-row {
    margin-bottom: 4px;
    color: @black-c;
    font-size: 14px;
  }
  .btn-group {
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-button {
      margin: 0;
      width: 50%;
    }
  }
}
</style>
