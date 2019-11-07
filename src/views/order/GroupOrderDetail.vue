<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="团购订单详情"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-panel :status="order.paystatus || order.paytypestr" title="商品信息">
      <van-card
        :num="order.num"
        :origin-price="order.price"
        :price="order.total_money"
        :tag="status[order.status]"
        :thumb="order.pic"
        :title="order.s_name"
      />
    </van-panel>
    <div class="white-space"></div>
    <van-panel title="用户信息">
      <van-row>
        <van-col span="6">用户ID：</van-col>
        <van-col span="18">{{ user.uid }}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">用户名：</van-col>
        <van-col span="18">{{ user.nickname }}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">手机号：</van-col>
        <van-col span="18">
          <a :href="'tel:' + user.phone">
            {{ user.phone }}
            <van-icon color="#1989fa" name="phone-o" />
          </a>
        </van-col>
      </van-row>
    </van-panel>
    <template v-if="order.store_id === '0' && storeFront.length > 0">
      <div class="white-space"></div>
      <van-panel title="将订单归属于店铺">
        <van-row>
          <van-col span="6">店铺：</van-col>
          <van-col span="18">
            <van-button @click="_controlStoreFrontPicker" size="small">选择归属</van-button>
          </van-col>
        </van-row>
      </van-panel>
    </template>
    <div class="white-space"></div>
    <van-panel title="订单信息">
      <van-row>
        <van-col span="6">订单类型：</van-col>
        <van-col span="18">{{ order.order_type }}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">订单号：</van-col>
        <van-col span="18">{{ order.real_orderid }}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">下单时间：</van-col>
        <van-col span="18">{{ order.add_time }}</van-col>
      </van-row>
      <van-row>
        <van-col span="6">付款时间：</van-col>
        <van-col span="18">{{ order.pay_time }}</van-col>
      </van-row>
    </van-panel>
    <template v-if="order.store_id && distribution.adress">
      <div class="white-space"></div>
      <van-panel class="right" title="配送信息">
        <van-row>
          <van-col span="6">收件人：</van-col>
          <van-col span="18">
            {{ distribution.contact_name }} -
            {{ distribution.phone }}
            <van-icon color="#1989fa" name="phone-o" />
          </van-col>
        </van-row>
        <van-row>
          <van-col span="6">收货地址：</van-col>
          <van-col span="18">{{ distribution.adress }}</van-col>
        </van-row>
      </van-panel>
      <div class="white-space"></div>
      <van-panel class="center" title="快递信息">
        <van-row>
          <van-col span="6">物流公司：</van-col>
          <van-col span="18">
            <div v-show="expressLabel">
              {{ expressLabel }}
              <van-icon @click="_controlExpressPicker" color="#ffb000" name="edit" />
            </div>
            <van-button @click="_controlExpressPicker" size="small" v-show="!expressLabel">选择快递</van-button>
          </van-col>
        </van-row>
        <van-row>
          <van-col span="6">快递单号：</van-col>
          <van-col span="18">
            <van-field placeholder="请填写快递单号">123</van-field>
          </van-col>
        </van-row>
        <div slot="footer" v-if="expressLabel">
          <van-button @click="_saveExpressInfo" icon="success" size="small" type="primary">保存</van-button>
        </div>
      </van-panel>
    </template>
    <div class="white-space"></div>
    <van-panel class="right" title="付款信息">
      <van-row>
        <van-col span="10">系统余额支付：</van-col>
        <van-col span="14">¥ {{ order.balance_pay }}</van-col>
      </van-row>
      <van-row>
        <van-col span="10">商家会员卡余额支付：</van-col>
        <van-col span="14">¥ {{ order.merchant_balance }}</van-col>
      </van-row>
      <van-row>
        <van-col span="10">在线支付金额：</van-col>
        <van-col span="14">¥ {{ order.payment_money }}</van-col>
      </van-row>
    </van-panel>
    <div class="white-space"></div>
    <van-panel class="right" title="买家留言">
      <van-row>
        <van-col span="24">{{ order.delivery_comment || '无留言' }}</van-col>
      </van-row>
    </van-panel>
    <!-- 弹出层 -->
    <van-popup position="bottom" v-model="showStoreFrontPicker">
      <van-picker
        :columns="storeFront"
        @cancel="_controlStoreFrontPicker"
        @confirm="_pickerStoreFront"
        show-toolbar
        value-key="name"
      />
    </van-popup>
    <van-popup position="bottom" v-model="showExpressPicker">
      <van-picker
        :columns="express"
        @cancel="_controlExpressPicker"
        @confirm="_pickerExpress"
        show-toolbar
        value-key="name"
      />
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'groupOrderDetail',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      order: {},
      user: {},
      express: [],
      distribution: {},
      storeFront: [],
      type: {
        1: '未消费',
        2: '未发货',
        3: '已消费',
        4: '已发货',
      },
      status: {
        1: '已取消',
        2: '线下未支付',
        3: '已付款',
        4: '待评论',
        5: '已完成',
        6: '未付款',
      },
      showStoreFrontPicker: false,
      showExpressPicker: false,
      expressLabel: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    this._readGroupOrderDetail(id)
    window.scrollTo(0, 0)
  },

  destroyed() {},

  methods: {
    ...mapActions('order', ['readGroupOrderDetail', 'ascriptionGroupOrder']),
    // 店铺归属开关
    _controlStoreFrontPicker() {
      this.showStoreFrontPicker = !this.showStoreFrontPicker
    },
    // 物流公司选择
    _controlExpressPicker() {
      this.showExpressPicker = !this.showExpressPicker
    },
    // 归属店铺选择
    _pickerStoreFront(data) {
      const { id } = this.$route.params
      this.ascriptionGroupOrder({ order_id: id, store_id: data.store_id }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1500,
          onClose: () => {
            this.__readGroupOrderDetail(id)
          },
        })
      })
      this._controlStoreFrontPicker()
    },
    // 选择物流公司
    _pickerExpress(data) {
      console.log(data)
      this.expressLabel = data.name
      this._controlExpressPicker()
    },
    // 保存快递信息
    _saveExpressInfo() {
      console.log('保存快递信息')
    },
    // 获取详情数据
    _readGroupOrderDetail(id) {
      this.readGroupOrderDetail(id).then(res => {
        this.order = res.now_order
        this.user = res.user
        this.storeFront = res.storelist
        this.distribution = res.distribution
        this.express = res.express_list
      })
    },
  },
}
</script>

<style lang="less" scoped>
.van-panel {
  border-radius: 14px;
  overflow: hidden;
}

.van-panel__footer {
  text-align: right;
}

.van-row {
  padding: 16px 16px 0;
  font-size: 14px;

  .van-col:first-child {
    color: #888;
  }
  .van-col:last-child {
    color: #444;
  }
}

.van-row:last-child {
  padding: 16px;
}

.right {
  .van-row {
    .van-col:last-child {
      text-align: right;
    }
  }
}

.center {
  .van-row {
    display: flex;
    align-items: center;
  }
}

.van-icon {
  vertical-align: -2px;
}

.van-field {
  padding: 0;
}
</style>
