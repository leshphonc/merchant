<template>
  <div>
    <van-nav-bar :title="`${type}店铺`" @click-left="_goBack" fixed left-arrow></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver @submit.prevent="_submit" ref="observer" tag="form" v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="店铺名称" rules="required" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="店铺名称" placeholder="店铺名称" required v-model.trim="formData.name" />
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
            v-model.trim="formData.phone"
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
            v-model.trim="formData.adress"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="地图位置" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="coordinateLabel"
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
            v-model.trim="formData.sort"
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
            :value="storeFrontCategoryLabel"
            @click="_controlStoreFrontCategory"
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
            v-model.trim="formData.txt_info"
          ></van-field>
        </ValidationProvider>
        <img-cropper :confirm="_pickShopLogo" :list="shop_logo" field="商户LOGO" ref="shopLogo" title="商户LOGO"></img-cropper>
        <img-cropper :confirm="_pickPic" :count="5" :list="pic" :ratio="[2, 1]" field="店铺图片" ref="pic" title="店铺图片"></img-cropper>
        <img-cropper
          :confirm="_pickQRCode"
          :fixedRatio="false"
          :list="qrcode_backgroup"
          field="二维码背景图"
          ref="qrcode"
          title="二维码背景图"
        ></img-cropper>
        <van-field
          :value="disCountLabel"
          @click="_controlDisCount"
          error-message-align="right"
          input-align="right"
          is-link
          label="优惠类型"
          readonly
        ></van-field>
        <ValidationProvider name="折扣率" rules="required" slim v-if="disCountLabel === '折扣'" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="折扣率"
            placeholder="折扣率"
            required
            v-model.trim="formData.discount_percent"
          />
        </ValidationProvider>
        <ValidationProvider name="满足金额" rules="required" slim v-if="disCountLabel === '满减'" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="满"
            placeholder="满足金额"
            required
            v-model.trim="formData.condition_price"
          />
        </ValidationProvider>
        <ValidationProvider name="减少金额" rules="required" slim v-if="disCountLabel === '满减'" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="减"
            placeholder="减少金额"
            required
            v-model.trim="formData.minus_price"
          />
        </ValidationProvider>
        <van-cell required title="店铺详情"></van-cell>
        <quill-editor ref="myQuillEditor" v-model.trim="formData.context"></quill-editor>
      </van-cell-group>
      <van-button :loading="loading" class="submit">保存</van-button>
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
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStoreFrontCategory">
      <van-picker
        :columns="storeFrontCategory"
        @cancel="_controlStoreFrontCategory"
        @change="_changeStoreFrontCategory"
        @confirm="_pickStoreFrontCategory"
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
export default {
  name: 'storeFrontCRU',

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
      storeFrontCategoryOrigin: [],
      storeFrontCategory: [],
      // 优惠类型pickerData
      disCountColumns: [{ label: '无优惠', value: '0' }, { label: '折扣', value: '1' }, { label: '满减', value: '2' }],
      // 控制开关
      showAreaPicker: false,
      showCoordinatePicker: false,
      showStoreBusiness: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      showStoreFrontCategory: false,
      showDisCount: false,
      loading: false,
      // picker placeholder
      storeBusinessValue: 'have_service',
      area: [],
      // 默认数据
      shop_logo: [],
      pic: [],
      qrcode_backgroup: [],
      formData: {
        name: '',
        ismain: false,
        phone: '',
        province_id: '3133',
        city_id: '3134',
        area_id: '3136',
        circle_id: '3489',
        market_id: '15',
        adress: '',
        lat: '',
        long: '',
        sort: '',
        have_service: '0',
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
    // 店铺地址非空验证
    coordinateLabel() {
      if (!this.formData.long || !this.formData.lat) return ''
      return this.formData.long + ', ' + this.formData.lat
    },
    // 店铺业务非空验证
    storeBusinessLabel() {
      const item = this.storeBusinessColumns.find(item => item.value === this.storeBusinessValue)
      return item && item.label
    },
    // 店铺分类非空验证
    storeFrontCategoryLabel() {
      if (!this.storeFrontCategoryOrigin.length || !this.formData.cat_fid || !this.formData.cat_id) return ''
      const item1 = this.storeFrontCategoryOrigin.find(item => item.value === this.formData.cat_fid)
      const item2 = item1.children.find(item => item.value === this.formData.cat_id)
      return item1.label + ' / ' + item2.label
    },
    // 开始时间非空验证
    startTimeLabel() {
      return this.formData.open_1 ? this.formData.open_1 : ''
    },
    // 结束时间非空验证
    endTimeLabel() {
      return this.formData.close_1 ? this.formData.close_1 : ''
    },
    // 优惠类型非空验证
    disCountLabel() {
      const item = this.disCountColumns.find(item => item.value === this.formData.discount_type)
      return item.label
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

  mounted() {
    window.scroll(0, 0)
    // 是否为编辑店铺
    const { id } = this.$route.params
    // 获取平台店铺分类
    if (id) {
      this._getStoreFrontDetail(id)
    } else {
      this._getPlatformStoreFrontCategory()
    }
  },

  destroyed() {},

  methods: {
    ...mapActions('storeFront', [
      'createStoreFront',
      'getStoreFrontDetail',
      'updateStoreFront',
      'getPlatformStoreFrontCategory',
    ]),
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
    _controlStoreFrontCategory() {
      this.showStoreFrontCategory = !this.showStoreFrontCategory
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
    _changeStoreFrontCategory(picker, values) {
      const data = this.storeFrontCategoryOrigin.find(item => item.label === values[0].label)
      let result = []
      if (data.children.length) {
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
      this.formData.long = lng
      this.formData.lat = lat
      console.log(address)
      this._controlCoordinatePicker()
    },
    // 店铺业务选择
    _pickStoreBusiness(data) {
      this.storeBusinessValue = data.value
      this._controlStoreBusiness()
    },
    // 店铺分类选择
    _pickStoreFrontCategory(data) {
      this.formData.cat_fid = data[0].value
      this.formData.cat_id = data[1].value
      this._controlStoreFrontCategory()
    },
    // 开始时间选择
    _pickStartTime(data) {
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
      this.formData.shop_logo = data[0].url
    },
    // 截取店铺图片
    _pickPic(data) {
      this.formData.pic = data.map(item => item.url)
    },
    // 截取二维码背景图片
    _pickQRCode(data) {
      this.formData.qrcode_backgroup = data[0].url
    },
    // 优惠类型选择
    _pickDisCount(data) {
      this.formData.discount_type = data.value
      this._controlDisCount()
    },
    // 获取平台店铺分类
    _getPlatformStoreFrontCategory(fid, id) {
      this.getPlatformStoreFrontCategory().then(res => {
        this.storeFrontCategoryOrigin = res
        this._serializationStoreFrontCategory(fid, id)
      })
    },
    // 序列化店铺分类数据用于picker
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
          values: data.map(item => {
            return { label: item.label, value: item.value }
          }),
          defaultIndex: index1,
        },
        {
          values: data[index1].children.map(item => {
            return { label: item.label, value: item.value }
          }),
          defaultIndex: index2,
        },
      ]
    },
    // 获取店铺默认数据
    _getStoreFrontDetail(id) {
      this.getStoreFrontDetail(id).then(res => {
        console.log(res)
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        this.formData.ismain = res.ismain === '1'
        this.shop_logo = [
          {
            url: res.shop_logo,
          },
        ]
        this.pic = res.pic
        this.qrcode_backgroup = [
          {
            url: res.qrcode_backgroup,
          },
        ]
        this._getPlatformStoreFrontCategory(res.cat_fid, res.cat_id)
        this.$nextTick(function() {
          this.$refs.myQuillEditor.quill.blur()
          window.scroll(0, 0)
        })
      })
    },
    // 提交数据
    async _submit() {
      // 锁
      if (this.loading) return false
      // 验证表单完整性
      const isValid = await this.$refs.observer.validate()
      console.log(this.formData)
      // 表单不完整
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
          // 解锁
          this.loading = true
          // 表单完整，进行数据修改并提交
          this.formData.ismain ? (this.formData.ismain = '1') : (this.formData.ismain = '0')
          this.formData[this.storeBusinessValue] = '1'
          let method = 'createStoreFront'
          const { id } = this.$route.params
          if (id) {
            method = 'updateStoreFront'
            this.formData.store_id = id
          }
          this[method](this.formData)
            .then(() => {
              this.$toast.success({
                message: '操作成功',
                forbidClick: true,
                duration: 1500,
                onClose: () => {
                  this.loading = false
                  this._goBack()
                },
              })
            })
            .catch(() => {
              this.loading = false
            })
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