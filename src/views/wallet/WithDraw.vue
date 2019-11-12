<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="申请提现"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="提款人真实姓名" rules="required" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="姓名" placeholder="提款人真实姓名" required v-model.trim="formData.name"></van-field>
        </ValidationProvider>
        <ValidationProvider name="提款人真实姓名" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="提现金额"
            placeholder="最低提现1元"
            required
            type="number"
            v-model.trim="formData.money"
          ></van-field>
        </ValidationProvider>
        <van-cell :value="paymentLabel" @click="_controlPaymentType" is-link title="提现至"></van-cell>
        <ValidationProvider name="微信账号" rules="required" slim v-if="formData.withdraw_type === '3'" v-slot="{ errors }">
          <van-cell
            :error-message="errors[0]"
            :value="wxAccountLabel"
            @click="_controlWxAccount"
            is-link
            required
            title="微信账号"
          ></van-cell>
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group v-if="formData.withdraw_type === '0'">
        <div class="title" slot="title">
          <div>开票信息</div>
          <div>公司名称：浙江由客企业管理有限公司</div>
          <div>税号：91330103MA27X12E7D</div>
          <div>开户银行：中国农业银行杭州市延安路支行</div>
          <div>银行账号：19036101040026829</div>
          <div>电话：400-659-9953</div>
          <div>地址：杭州市下城区岳帅桥10号1幢569室</div>
          <div>发票类型为：增值税专用发票</div>
          <div>发票类目：软件服务费</div>
        </div>
        <ValidationProvider name="账户名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="账户名称"
            placeholder="请填写账户名称"
            required
            v-model.trim="formData.card_username"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="银行卡号" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="银行卡号"
            placeholder="请填写银行卡号"
            required
            type="number"
            v-model.trim="formData.card_number"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="开户行" rules="required" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="开户行" placeholder="请填写开户行" required v-model.trim="formData.bank"></van-field>
        </ValidationProvider>
        <img-cropper :confirm="_pickInvoice" field="发票" title="发票"></img-cropper>
      </van-cell-group>
      <van-field
        autosize
        label="备注"
        maxlength="100"
        placeholder="选填"
        show-word-limit
        type="textarea"
        v-model.trim="formData.info"
      ></van-field>
    </ValidationObserver>
    <!-- 弹出层 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showPaymentTypePicker">
      <van-picker
        :columns="paymentTypeColumns"
        :default-index="paymentIndex"
        @cancel="_controlPaymentType"
        @confirm="_pickPaymentType"
        show-toolbar
        value-key="label"
      />
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showWxAccountPicker">
      <van-picker
        :columns="wxAccountColumns"
        @cancel="_controlWxAccount"
        @confirm="_pickWxAccount"
        show-toolbar
        value-key="nickname"
      />
    </van-popup>
    <van-row>
      <van-col span="24">
        <van-button @click="_submit" type="primary">提现</van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'

export default {
  name: 'withDraw',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        name: '',
        money: '',
        withdraw_type: '3',
        weixin_account: '',
        card_username: '',
        card_number: '',
        bank: '',
        invoice: '',
        info: '',
      },
      loading: false,
      paymentTypeColumns: [
        {
          label: '微信钱包',
          value: '3',
        },
        {
          label: '对公账户',
          value: '0',
        },
      ],
      wxAccountColumns: [],
      showPaymentTypePicker: false,
      showWxAccountPicker: false,
    }
  },

  computed: {
    paymentLabel() {
      const item = this.paymentTypeColumns.find(item => item.value === this.formData.withdraw_type)
      return item && item.label
    },
    paymentIndex() {
      const index = this.paymentTypeColumns.findIndex(item => item.value === this.formData.withdraw_type)
      return index > -1 ? index : 0
    },
    wxAccountLabel() {
      return '请选择微信账号'
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._readWxAccount()
  },

  destroyed() {},

  methods: {
    ...mapActions('wallet', ['readWxAccount']),
    // 提现方式开关
    _controlPaymentType() {
      this.showPaymentTypePicker = !this.showPaymentTypePicker
    },
    // 微信账号选择开关
    _controlWxAccount() {
      this.showWxAccountPicker = !this.showWxAccountPicker
    },
    // 提现方式选择
    _pickPaymentType(data) {
      this.formData.withdraw_type = data.value
      this._controlPaymentType()
    },
    // 微信账号选择
    _pickWxAccount(data) {
      console.log(data)
      this._controlWxAccount()
    },
    // 发票图片选择
    _pickInvoice(data) {
      this.formData.invoice = data[0].url
      console.log(data)
    },
    // 读取微信账号列表
    _readWxAccount() {
      this.readWxAccount().then(res => {
        console.log(res)
        this.wxList = res.bind_wxlist
      })
    },
    // 提交数据
    async _submit() {
      // 锁
      if (this.loading) return false
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      console.log(this.formData)
      // 表单不完整
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        // // 加锁
        // this.loading = true
        // // 表单完整，进行数据修改并提交
        // this.a(this.formData)
        //   .then(() => {
        //     this.$toast.success({
        //       message: '操作成功',
        //       forbidClick: true,
        //       duration: 1500,
        //       onClose: () => {
        //         // 解锁
        //         this.loading = false
        //         this.$goBack()
        //       },
        //     })
        //   })
        //   .catch(() => {
        //     this.loading = false
        //   })
      }
    },
  },
}
</script>

<style lang="less" scoped>
.van-button {
  width: 90%;
  margin-left: 5%;
  margin-top: 5%;
  margin-bottom: 5%;
}

.title {
  div {
    margin-bottom: 6px;
  }
}
</style>
