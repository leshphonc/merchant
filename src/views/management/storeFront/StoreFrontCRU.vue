<template>
  <div>
    <van-nav-bar :title="`${type}店铺`" @click-left="_goBack" fixed left-arrow></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver @submit.prevent="_submit" ref="observer" tag="form" v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="店铺名称" rules="required" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="店铺名称" placeholder="店铺名称" required v-model="formData.name" />
        </ValidationProvider>
        <van-cell placeholder="请输入用户名" title="是否设置成主店">
          <van-switch size="20px" slot="default" v-model="formData.ismain"></van-switch>
        </van-cell>
        <ValidationProvider name="联系电话" rules="required|phone" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="联系电话"
            placeholder="联系电话"
            required
            type="tel"
            v-model="formData.phone"
          />
        </ValidationProvider>
        <ValidationProvider name="店铺所在地" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="areaLabel"
            @click="_controlAreaPicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="店铺所在地"
            placeholder="选择地址"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="所处商圈" rules="required" slim v-show="areaLabel" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="areaLabel"
            error-message-align="right"
            input-align="right"
            is-link
            label="所处商圈"
            placeholder="选择商圈"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="所处商盟" rules="required" slim v-show="areaLabel" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="areaLabel"
            error-message-align="right"
            input-align="right"
            is-link
            label="所处商盟"
            placeholder="选择商盟"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="详细地址" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="详细地址"
            maxlength="100"
            placeholder="店铺详细地址"
            required
            rows="2"
            show-word-limit
            type="textarea"
            v-model="formData.adress"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="地图位置" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="addressLabel"
            @click="_controlCoordinatePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="地图位置"
            placeholder="选择地图坐标"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="店铺排序" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-right-icon="$toast('数值越大，排序越靠前')"
            label="店铺排序"
            placeholder="列表中显示顺序"
            required
            right-icon="question-o"
            v-model="formData.sort"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="店铺业务" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="storeBusinessLabel"
            @click="_controlStoreBusiness"
            error-message-align="right"
            input-align="right"
            is-link
            label="店铺业务"
            placeholder="选择业务"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="店铺分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="storeCategoryLabel"
            @click="_controlStoreCategory"
            error-message-align="right"
            input-align="right"
            is-link
            label="店铺分类"
            placeholder="选择分类"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="营业开始时间" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="startTimeLabel"
            @click="_controlStartTime"
            error-message-align="right"
            input-align="right"
            is-link
            label="营业开始时间"
            placeholder="选择开始时间"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="营业结束时间" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="endTimeLabel"
            @click="_controlEndTime"
            error-message-align="right"
            input-align="right"
            is-link
            label="营业结束时间"
            placeholder="选择结束时间"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="店铺描述" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="店铺描述"
            maxlength="100"
            placeholder="详细介绍"
            required
            rows="2"
            show-word-limit
            type="textarea"
            v-model="formData.txt_info"
          ></van-field>
        </ValidationProvider>
        <img-cropper :confirm="_pickShopLogo" field="商户LOGO" ref="shopLogo" title="商户LOGO"></img-cropper>
        <img-cropper :confirm="_pickPic" :count="5" :ratio="[2, 1]" field="店铺图片" ref="pic" title="店铺图片"></img-cropper>
        <img-cropper :confirm="_pickQRCode" :fixedRatio="false" field="二维码背景图" ref="qrcode" title="二维码背景图"></img-cropper>
        <van-cell :value="disCountLabel" @click="_controlDisCount" is-link title="优惠类型"></van-cell>
        <van-cell required title="店铺详情"></van-cell>
        <quill-editor ref="myQuillEditor" v-model="formData.context"></quill-editor>
      </van-cell-group>
      <van-button class="submit">保存</van-button>
    </ValidationObserver>

    <!-- 弹出层 -->
    <!-- 地区选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showAreaPicker">
      <van-area :area-list="areaData" @cancel="_controlAreaPicker" @confirm="_pickArea" />
    </van-popup>
    <!-- 坐标选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCoordinatePicker">
      <coordinate-picker :cancel="_controlCoordinatePicker" :confirm="_pickCoordinate"></coordinate-picker>
    </van-popup>
    <!-- 店铺业务 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStoreBusiness">
      <van-picker
        :columns="storeBusinessColumns"
        :default-index="storeBussinessIndex"
        @cancel="_controlStoreBusiness"
        @confirm="_pickStoreBusiness"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 店铺分类 -->
    <van-popup :columns="cache" position="bottom" safe-area-inset-bottom v-model="showStoreCategory">
      <van-picker
        :columns="cache"
        @cancel="_controlStoreCategory"
        @change="_changeStoreCategory"
        @confirm="_pickStoreCategory"
        show-toolbar
        value-key="label"
      />
    </van-popup>
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker @cancel="_controlStartTime" @confirm="_pickStartTime" type="time" v-model="formData.open_1" />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker @cancel="_controlEndTime" @confirm="_pickEndTime" type="time" v-model="formData.close_1" />
    </van-popup>
    <!-- 优惠类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showDisCount">
      <van-picker
        :columns="disCountColumns"
        @cancel="_controlDisCount"
        @confirm="_pickDisCount"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import areaData from '@/assets/js/area'
import ImgCropper from '@/components/ImgCropper'
import CoordinatePicker from '@/components/CoordinatePicker'
// import Utils from '@/utils/index'
const seData = [
  {
    value: '16',
    label: '\u670d\u88c5',
    fid: '0',
    status: '1',
    children: [
      { value: '19', label: '\u7537\u88c5', fid: '16', status: '1' },
      { value: '20', label: '\u5973\u88c5', fid: '16', status: '1' },
      { value: '28', label: '\u914d\u9970', fid: '16', status: '1' },
      { value: '29', label: '\u978b\u5305', fid: '16', status: '1' },
    ],
  },
  {
    value: '17',
    label: '\u7f8e\u5986',
    fid: '0',
    status: '1',
    children: [
      { value: '21', label: '\u4fdd\u517b\u62a4\u80a4', fid: '17', status: '1' },
      { value: '22', label: '\u5f69\u5986\u9999\u6c34', fid: '17', status: '1' },
      { value: '30', label: '\u4e2a\u4eba\u62a4\u7406', fid: '17', status: '1' },
    ],
  },
  {
    value: '18',
    label: '\u6570\u7801',
    fid: '0',
    status: '1',
    children: [
      { value: '23', label: '\u624b\u673a', fid: '18', status: '1' },
      { value: '24', label: '\u7535\u8111', fid: '18', status: '1' },
      { value: '31', label: '\u6570\u7801\u914d\u4ef6', fid: '18', status: '1' },
      { value: '35', label: '\u76f8\u673a', fid: '18', status: '1' },
      { value: '36', label: '\u97f3\u54cd', fid: '18', status: '1' },
      { value: '37', label: '\u626b\u5730\u673a\u5668\u4eba', fid: '18', status: '1' },
      { value: '38', label: '\u667a\u80fd\u8bbe\u5907', fid: '18', status: '1' },
      { value: '39', label: '\u6e38\u620f\u673a', fid: '18', status: '1' },
      { value: '40', label: '\u5f39\u5f13', fid: '18', status: '1' },
    ],
  },
  { value: '26', label: '\u9c9c\u82b1', fid: '0', status: '1' },
  {
    value: '32',
    label: '\u751f\u6d3b\u7528\u54c1',
    fid: '0',
    status: '1',
    children: [{ value: '34', label: '\u5bb6\u5c45\u65e5\u7528', fid: '32', status: '1' }],
  },
]
export default {
  name: '',

  mixins: [],

  components: {
    ImgCropper,
    CoordinatePicker,
  },

  props: {},

  data() {
    return {
      // 地区pickerData
      areaData,
      // 店铺业务pickerData
      storeBusinessColumns: [
        { label: '标准', value: 'have_service' },
        { label: '外卖', value: 'have_peisong' },
        { label: '餐饮', value: 'have_meal' },
        { label: '酒店', value: 'have_hotel' },
        { label: '汽配', value: 'have_auto_parts' },
      ],
      cache: [
        {
          values: seData.map(item => {
            return { label: item.label, value: item.value }
          }),
          className: 'column1',
        },
        {
          values: seData[0].children.map(item => {
            return { label: item.label, value: item.value }
          }),
          className: 'column2',
        },
      ],
      // 优惠类型pickerData
      disCountColumns: [{ label: '无优惠', value: '0' }, { label: '折扣', value: '1' }, { label: '满减', value: '2' }],
      // 控制开关
      showAreaPicker: false,
      showCoordinatePicker: false,
      showStoreBusiness: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      showStoreCategory: false,
      showDisCount: false,
      // picker placeholder
      disCountLabel: '无优惠',
      storeBusinessLabel: '',
      storeCategoryLabel: '',
      addressLabel: '',
      storeBusinessValue: 'have_service',
      area: [],
      formData: {
        name: '',
        ismain: false,
        phone: '',
        province_id: '',
        city_id: '',
        area_id: '',
        circle_id: '',
        market_id: '',
        adress: '',
        lat: '',
        lng: '',
        sort: '',
        have_service: '0',
        have_mall: '0',
        have_peisong: '0',
        have_meal: '0',
        have_hotel: '0',
        have_auto_parts: '0',
        open_1: '',
        close_1: '',
        txt_info: '',
        cat_fid: '',
        cat_id: '',
        shop_logo: '',
        pic: [],
        qrcode_backgroup: '',
        discount_type: '0',
        discount_percent: '',
        condition_price: '',
        minus_price: '',
        context: '',
      },
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    // 店铺所在地非空验证
    areaLabel() {
      if (this.area.length) {
        return this.area[0].name + ' / ' + this.area[1].name + ' / ' + this.area[2].name
      }
      return ''
    },
    // 开始时间非空验证
    startTimeLabel() {
      return this.formData.open_1 ? this.formData.open_1 : ''
    },
    // 结束时间非空验证
    endTimeLabel() {
      return this.formData.close_1 ? this.formData.close_1 : ''
    },
    // 商圈显示控制
    showCircle() {
      return this.areaLabel !== '请选择'
    },
    // 商盟显示控制
    showMarket() {
      return this.circleLabel !== '请选择'
    },
    // 店铺业务默认数据
    storeBussinessIndex() {
      const index = this.storeBusinessColumns.findIndex(item => {
        return item.value === this.storeBusinessValue
      })
      return index
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    ...mapActions('storeFront', ['createStoreFront']),
    _goBack() {
      this.$router.go(-1)
    },
    // 地区选择开关
    _controlAreaPicker() {
      this.showAreaPicker = !this.showAreaPicker
    },
    // 坐标拾取
    _controlCoordinatePicker() {
      this.showCoordinatePicker = !this.showCoordinatePicker
    },
    // 店铺业务开关
    _controlStoreBusiness() {
      this.showStoreBusiness = !this.showStoreBusiness
    },
    // 店铺分类开关
    _controlStoreCategory() {
      this.showStoreCategory = !this.showStoreCategory
    },
    // 开始时间开关
    _controlStartTime() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    // 结束时间开关
    _controlEndTime() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    // 优惠类型开关
    _controlDisCount() {
      this.showDisCount = !this.showDisCount
    },
    // 生成店铺业务第二行数据
    _changeStoreCategory(picker, values) {
      const data = seData.find(item => item.label === values[0].label)
      let result = []
      if (data.children) {
        result = data.children.map(item => {
          return { label: item.label, value: item.value }
        })
      }
      picker.setColumnValues(1, result)
    },
    // 地区选择
    _pickArea(data) {
      this.area = data
      this._controlAreaPicker()
    },
    // 坐标选择
    _pickCoordinate(lng, lat, address) {
      this.addressLabel = lng + ', ' + lat
      this.formData.lng = lng
      this.formData.lat = lat
      console.log(address)
      this._controlCoordinatePicker()
    },
    // 店铺业务选择
    _pickStoreBusiness(data) {
      console.log(data)
      this.storeBusinessLabel = data.label
      this.storeBusinessValue = data.value
      this._controlStoreBusiness()
    },
    // 店铺分类选择
    _pickStoreCategory(data) {
      console.log(data)
      let el = ''
      data.forEach(item => {
        el += item.label + ' / '
      })
      this.storeCategoryLabel = el.substr(0, el.length - 2)
      this._controlStoreCategory()
    },
    // 开始时间选择
    _pickStartTime(data) {
      console.log(data)
      this.formData.open_1 = data
      this._controlStartTime()
    },
    // 结束时间选择
    _pickEndTime(data) {
      this.formData.close_1 = data
      this._controlEndTime()
    },
    // 截取商户LOGO
    _pickShopLogo(data) {
      console.log(data)
      console.log(data[0].url)
      this.formData.shop_logo = data[0].url
    },
    // 截取店铺图片
    _pickPic(data) {
      console.log(data)
      this.formData.pic = data
    },
    // 截取二维码背景图片
    _pickQRCode(data) {
      console.log(data)
      this.formData.qrcode_backgroup = data[0].url
    },
    // 优惠类型选择
    _pickDisCount(data) {
      this.disCountLabel = data.label
      this._controlDisCount()
    },
    // 提交数据
    async _submit() {
      const isValid = await this.$refs.observer.validate()
      console.log(this.formData)
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        if (!this.formData.context) {
          this.$notify({
            type: 'warning',
            message: '请填写完整信息',
          })
        } else {
          console.log(this.formData.context)
          console.log(this.formData)
          this.createStoreFront(this.formData)
        }
      }
    },
  },
}
</script>

<style lang="less" scoped>
.submit {
  margin: 10px 0;
  width: 100%;
}
</style>
