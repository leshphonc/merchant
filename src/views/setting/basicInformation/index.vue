<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="基本信息"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="基本信息">
      <van-cell :value="merchant.name" title="商户名称" />
      <van-cell :value="merchant.account" title="账号" />
      <van-cell :value="merchant.phone" @click="_controlPhoneDialog" is-link title="联系电话" />
      <van-cell :value="merchant.email" @click="_controlEmailDialog" is-link title="邮箱" />
      <van-cell :value="timeOutLabel" @click="_controlTimeOutPicker" is-link title="超时时间" />
      <van-cell title="线下支付权限">
        <van-switch @change="_changeTimeOut" v-model="info.is_offline" />
      </van-cell>
      <van-cell :value="lnglatLabel" @click="_controlCoordinatePicker" is-link title="商户经纬度" />
      <van-cell :value="merchant.adress || '请编辑'" @click="_controlAddressPicker" is-link title="详细地址" />
      <van-cell @click="_controlStoreFrontCategoryPicker" is-link title="商户所属分类">
        <div class="tag-box" v-if="fidLabel && idLabel">
          <van-tag plain type="primary">{{ fidLabel }}</van-tag>
          <van-tag plain type="primary">{{ idLabel }}</van-tag>
        </div>
        <div v-else>请选择</div>
      </van-cell>
    </van-cell-group>

    <van-cell-group title="商家描述">
      <van-cell :value="merchant.txt_info" @click="_controlDescDialog" is-link title="商户描述" />
      <img-cropper :confirm="_pickLogo" :list="logoList" title="商户LOGO" />
      <img-cropper :confirm="_pickPicture" :list="pictureList" :ratio="[2, 1]" title="商户图片" />
      <van-cell @click="_controlDetailEditor" is-link title="商户详情" />
    </van-cell-group>
    <van-cell-group title="绑定微信">
      <van-cell :value="merchant.uid ? '已绑定' : '点击绑定'" @click="_wxBind" is-link title="绑定微信"></van-cell>
    </van-cell-group>
    <div class="white-space"></div>
    <!-- 弹出层 -->
    <!-- 手机号 -->
    <van-dialog :before-close="_editPhone" show-cancel-button title="联系电话" v-model="showPhoneDialog">
      <van-field maxlength="11" placeholder="请填写手机号" type="number" v-model="info.phone"></van-field>
    </van-dialog>
    <!-- email -->
    <van-dialog :before-close="_editEmail" show-cancel-button title="邮箱地址" v-model="showEmailDialog">
      <van-field placeholder="请填写email地址" v-model="info.email"></van-field>
    </van-dialog>
    <!-- 超时时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTimeOutPicker">
      <van-picker
        :columns="timeOutColumns"
        :default-index="timeOutIndex"
        @cancel="_controlTimeOutPicker"
        @confirm="_pickTimeOut"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 经纬度 -->
    <coordinate-picker :cancel="_controlCoordinatePicker" :confirm="_pickCoordinate" :show="showCoordinatePicker"></coordinate-picker>
    <!-- 详细地址 -->
    <van-dialog :before-close="_editAddress" show-cancel-button title="商户详细地址" v-model="showAddressDialog">
      <van-field autosize placeholder="请填写商户详细地址" type="textarea" v-model="info.address"></van-field>
    </van-dialog>
    <!-- 店铺分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStoreFrontCategory">
      <van-picker
        :columns="storeFrontCategory"
        @cancel="_controlStoreFrontCategoryPicker"
        @change="_changeStoreFrontCategory"
        @confirm="_pickStoreFrontCategory"
        show-toolbar
        value-key="label"
      />
    </van-popup>
    <!-- 商户描述 -->
    <van-dialog :before-close="_editDesc" show-cancel-button title="商户描述" v-model="showDescDialog">
      <van-field autosize placeholder="请填写商户描述信息" type="textarea" v-model="info.txt_info"></van-field>
    </van-dialog>
    <!-- 商户详情 -->
    <van-popup :lazy-render="false" position="bottom" safe-area-inset-bottom v-model="showDetailEditor">
      <quill-editor :changeHtml="_changeHtml" :context="info.content" ref="editor"></quill-editor>
      <van-row>
        <van-col span="12">
          <van-button @click="showDetailEditor = false">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_editDetail" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import CoordinatePicker from '@/components/CoordinatePicker'
import ImgCropper from '@/components/ImgCropper'
import QuillEditor from '@/components/QuillEditor'
import Utils from '@/utils'

export default {
  name: 'basicInformation',

  mixins: [],

  components: {
    CoordinatePicker,
    ImgCropper,
    QuillEditor,
  },

  props: {},

  data() {
    return {
      merchant: {},
      wx: [],
      storeFrontCategoryOrigin: [],
      storeFrontCategory: [],
      timeOutColumns: [
        {
          label: '永不超时',
          value: '0',
        },
        {
          label: '一天后超时并确认消费',
          value: '1',
        },
      ],
      info: {
        phone: '',
        email: '',
        address: '',
        txt_info: '',
        is_offline: false,
        content: '',
      },
      showCoordinatePicker: false,
      showPhoneDialog: false,
      showEmailDialog: false,
      showTimeOutPicker: false,
      showAddressDialog: false,
      showStoreFrontCategory: false,
      showDescDialog: false,
      showDetailEditor: false,
      logoList: [],
      pictureList: [],
    }
  },

  computed: {
    // 超时时间label
    timeOutLabel() {
      const item = this.timeOutColumns.find(item => item.value === this.merchant.group_express_outtime)
      return item && item.label
    },
    // 经纬度label
    lnglatLabel() {
      return this.merchant.long && this.merchant.lat ? this.merchant.long + ', ' + this.merchant.lat : '请选择'
    },
    // 父级分类Label
    fidLabel() {
      const item = this.storeFrontCategoryOrigin.find(item => item.value === this.merchant.cat_fid)
      return item && item.label
    },
    // 父级分类Label
    idLabel() {
      const item = this.storeFrontCategoryOrigin.find(item => item.value === this.merchant.cat_fid)
      const item2 = item.children.find(item => item.value === this.merchant.cat_id)
      return item2 && item2.label
    },
    // 默认选中的超时类型
    timeOutIndex() {
      const index = this.timeOutColumns.findIndex(item => item.value === this.merchant.group_express_outtime)
      return index > -1 ? index : 0
    },
  },

  watch: {},

  created() {
    window['_WxLogin'] = this._WxLogin
  },

  mounted() {
    this._readMerchantInfo()
    if (this._isWx) {
      const code = Utils.getUrlParam('code')
      if (code) {
        this.getOpenid(code).then(openid => {
          this.bindWx(openid).then(() => {
            this.$toast.success({
              message: '绑定成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                this.$goBack()
              },
            })
          })
        })
      }
    }
  },

  destroyed() {},

  methods: {
    ...mapActions(['getOpenid', 'bindWx', 'bindWxByUnionID']),
    ...mapActions('basicInformation', ['readMerchantInfo', 'updateMerchantInfo']),
    ...mapActions('storeFront', ['getPlatformStoreFrontCategory']),
    // 坐标拾取
    _controlCoordinatePicker() {
      this.showCoordinatePicker = !this.showCoordinatePicker
    },
    // 修改手机号开关
    _controlPhoneDialog() {
      this.info.phone = this.merchant.phone
      this.showPhoneDialog = true
    },
    // 修改邮箱开关
    _controlEmailDialog() {
      this.info.email = this.merchant.email
      this.showEmailDialog = true
    },
    // 时间类型开关
    _controlTimeOutPicker() {
      this.showTimeOutPicker = !this.showTimeOutPicker
    },
    // 商户详细地址开关
    _controlAddressPicker() {
      this.info.address = this.merchant.adress
      this.showAddressDialog = !this.showAddressDialog
    },
    // 店铺分类选择开关
    _controlStoreFrontCategoryPicker() {
      this.showStoreFrontCategory = !this.showStoreFrontCategory
    },
    // 商户描述开关
    _controlDescDialog() {
      this.info.txt_info = this.merchant.txt_info
      this.showDescDialog = !this.showDescDialog
    },
    // 商户详情开关
    _controlDetailEditor() {
      this.info.content = this.merchant.content
      this.showDetailEditor = !this.showDetailEditor
    },
    // 坐标选择
    _pickCoordinate(lng, lat) {
      this.updateMerchantInfo({
        long: lng,
        lat: lat,
      }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            this._readMerchantInfo()
            this._controlCoordinatePicker()
          },
        })
      })
    },
    // 超时时间选中
    _pickTimeOut(data) {
      this.updateMerchantInfo({
        group_express_outtime: data.value,
      }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            this._controlTimeOutPicker()
            this._readMerchantInfo()
          },
        })
      })
    },
    // 店铺分类选择
    _pickStoreFrontCategory(data) {
      let cat_fid = data[0].value
      let cat_id = ''
      if (data[1]) {
        cat_id = data[1].value
      } else {
        cat_id = ''
      }
      this.updateMerchantInfo({
        cat_fid,
        cat_id,
      }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            this._readMerchantInfo()
            this._controlStoreFrontCategoryPicker()
          },
        })
      })
    },
    _pickLogo(data) {
      this.updateMerchantInfo({
        service_ico: data[0].url,
      }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            this._readMerchantInfo()
          },
        })
      })
    },
    _pickPicture(data) {
      this.updateMerchantInfo({
        pic_info: data[0].url,
      }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            this._readMerchantInfo()
          },
        })
      })
    },
    _changeTimeOut(checked) {
      this.updateMerchantInfo({
        is_offline: checked ? '1' : '0',
      }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            this._readMerchantInfo()
          },
        })
      })
    },
    _changeHtml(data) {
      this.info.content = data.html
    },
    // 获取平台店铺分类
    _getPlatformStoreFrontCategory(fid, id) {
      this.getPlatformStoreFrontCategory().then(res => {
        this.storeFrontCategoryOrigin = res
        this._serializationStoreFrontCategory(fid, id)
      })
    },
    // 根据columns原始数据序列化店铺分类数据用于picker
    _serializationStoreFrontCategory(fid, id) {
      const data = this.storeFrontCategoryOrigin
      let index1 = 0
      let index2 = 0
      if (fid && id) {
        index1 = data.findIndex(item => item.value === fid) >= 0 ? data.findIndex(item => item.value === fid) : 0
        index2 =
          data[index1].children.findIndex(item => item.value === id) >= 0
            ? data[index1].children.findIndex(item => item.value === id)
            : 0
      }
      this.storeFrontCategory = [
        {
          values: data,
          defaultIndex: index1,
        },
        {
          values: data[index1].children,
          defaultIndex: index2,
        },
      ]
    },
    // 生成店铺业务第二行数据
    _changeStoreFrontCategory(picker, values) {
      if (values[0].children) {
        picker.setColumnValues(1, values[0].children)
      } else {
        picker.setColumnValues(1, [])
      }
    },
    // 读取商户信息
    _readMerchantInfo() {
      this.readMerchantInfo().then(res => {
        this.merchant = res.now_merchant
        this.wx = res.bind_wxlist
        this.info.phone = res.now_merchant.phone
        this.info.address = res.now_merchant.adress
        this.info.is_offline = res.now_merchant.is_offline === '1'
        this.info.txt_info = res.now_merchant.txt_info
        this.info.content = res.now_merchant.content
        res.now_merchant.service_ico && (this.logoList = [{ url: res.now_merchant.service_ico }])
        res.now_merchant.pic_info && (this.pictureList = [{ url: res.now_merchant.pic_info }])

        this._getPlatformStoreFrontCategory(res.now_merchant.cat_fid, res.now_merchant.cat_id)
      })
    },
    // 修改手机号
    _editPhone(action, done) {
      if (action === 'confirm') {
        const boolean = Utils.matchExp('tel', this.info.phone)
        if (boolean) {
          this.updateMerchantInfo({
            phone: this.info.phone,
          }).then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1000,
              onClose: () => {
                this._readMerchantInfo()
                done()
              },
            })
          })
        } else {
          this.$toast.fail({
            message: '手机号格式不正确',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              done()
            },
          })
        }
      } else {
        done()
      }
    },
    // 修改邮箱
    _editEmail(action, done) {
      if (action === 'confirm') {
        const boolean = Utils.matchExp('email', this.info.email)
        if (boolean) {
          this.updateMerchantInfo({
            email: this.info.email,
          }).then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1000,
              onClose: () => {
                this._readMerchantInfo()
                done()
              },
            })
          })
        } else {
          this.$toast.fail({
            message: '邮箱格式不正确',
            forbidClick: true,
            duration: 1500,
            onClose: () => {
              done()
            },
          })
        }
      } else {
        done()
      }
    },
    // 修改详细地址
    _editAddress(action, done) {
      if (action === 'confirm') {
        this.updateMerchantInfo({
          adress: this.info.address,
        }).then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1000,
            onClose: () => {
              this._readMerchantInfo()
              done()
            },
          })
        })
      } else {
        done()
      }
    },
    // 修改商户描述
    _editDesc(action, done) {
      if (action === 'confirm') {
        this.updateMerchantInfo({
          txt_info: this.info.txt_info,
        }).then(() => {
          this.$toast.success({
            message: '操作成功',
            forbidClick: true,
            duration: 1000,
            onClose: () => {
              this._readMerchantInfo()
              done()
            },
          })
        })
      } else {
        done()
      }
    },
    // 修改商户详情
    _editDetail() {
      this.updateMerchantInfo({
        content: this.info.content,
      }).then(() => {
        this.$toast.success({
          message: '操作成功',
          forbidClick: true,
          duration: 1000,
          onClose: () => {
            this._readMerchantInfo()
            this.showDetailEditor = false
          },
        })
      })
    },
    // 绑定微信
    _wxBind() {
      if (this.merchant.uid) {
        this.$toast('已绑定微信，无需重复绑定')
        return false
      }
      if (this._isApp) {
        const json = { callback: '_WxLogin', action: 'WxLogin' }
        this.$invokeAndroid(json)
      } else if (this._isWx) {
        const appid = sessionStorage.getItem('merchant_wx_appid')
        this.$getWXCode(appid)
      } else {
        this.$toast('请在微信环境下进行绑定')
      }
    },
    // app绑定微信回调
    _WxLogin(obj) {
      alert(obj.unionid)
      this.bindWxByUnionID(obj.unionid)
        .then(() => {
          this.$toast.success({
            message: '绑定成功',
            forbidClick: true,
            duration: 1000,
            onClose: () => {
              this._readMerchantInfo()
            },
          })
        })
        .catch(() => {
          this.$toast.fail({
            message: '绑定失败',
            forbidClick: true,
            duration: 1000,
          })
        })
    },
  },
}
</script>

<style lang="less" scoped>
.van-tag + .van-tag {
  margin-left: 4px;
}

.van-dialog {
  /deep/.van-field__control {
    text-align: center;
  }
}
.van-popup {
  .van-button {
    width: 100%;
  }
}

.tag-box {
  padding-right: 1px;
}
</style>
