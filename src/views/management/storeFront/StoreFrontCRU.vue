<template>
  <div>
    <van-nav-bar
      :title="`${type}店铺`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="店铺名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="店铺名称"
            placeholder="店铺名称"
            required
            v-model.trim="formData.name"
          />
        </ValidationProvider>
        <van-cell placeholder="请填写用户名" title="是否设置成主店">
          <van-switch slot="default" v-model="formData.ismain"></van-switch>
        </van-cell>
        <ValidationProvider name="联系电话" rules="required|phoneAndLandline" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="联系电话"
            placeholder="联系电话"
            required
            type="tel"
            v-model.trim="formData.phone"
          />
        </ValidationProvider>
        <area-picker
          :data="defaultArea"
          :pickArea="_pickArea"
          :pickCircle="_pickCircle"
          :pickMarket="_pickMarket"
          field="店铺所在地"
          title="店铺所在地"
        ></area-picker>
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
            type="number"
            v-model.trim="formData.sort"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="店铺业务" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="businessLabel"
            @click="_controlBusinessPicker"
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
            @click="_controlStoreFrontCategoryPicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="店铺分类"
            placeholder="选择分类"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="打卡" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.clock_in_type.length ? '1' : ''"
            @click="_controlClockInPopup"
            error-message-align="right"
            input-align="right"
            is-link
            label="员工打卡"
            placeholder="请选择"
            readonly
            required
          >
            <div slot="input" v-if="formData.clock_in_type.length">
              <div :key="item" v-for="item in formData.clock_in_type">
                <van-tag type="primary">{{ _clockLabel(item) }}</van-tag>
              </div>
            </div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="营业开始时间" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="startTimeLabel"
            @click="_controlStartTimePicker"
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
            @click="_controlEndTimePicker"
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
        <img-cropper :confirm="_pickShopLogo" :list="shop_logo" field="商户LOGO" title="商户LOGO"></img-cropper>
        <img-cropper
          :confirm="_pickPic"
          :count="5"
          :list="pic"
          :ratio="[2, 1]"
          field="店铺图片"
          title="店铺图片"
        ></img-cropper>
        <img-cropper
          :confirm="_pickQRCode"
          :list="qrcode_backgroup"
          :ratio="[666, 1000]"
          field="二维码背景图"
          title="二维码背景图"
        ></img-cropper>
        <van-field
          :value="disCountLabel"
          @click="_controlDisCountPicker"
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
        <quill-editor :changeHtml="_changeHtml" :context="formData.context" ref="editor"></quill-editor>
      </van-cell-group>
    </ValidationObserver>

    <!-- 弹出层 -->
    <!-- 坐标选择 -->
    <coordinate-picker
      :cancel="_controlCoordinatePicker"
      :confirm="_pickCoordinate"
      :show="showCoordinatePicker"
    ></coordinate-picker>
    <!-- 店铺业务 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showBusinessPicker">
      <van-picker
        :columns="businessColumns"
        :default-index="storeBussinessIndex"
        @cancel="_controlBusinessPicker"
        @confirm="_pickBusiness"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
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
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        type="time"
        v-model="formData.open_1"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        type="time"
        v-model="formData.close_1"
      />
    </van-popup>
    <!-- 优惠类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showDisCount">
      <van-picker
        :columns="disCountColumns"
        @cancel="_controlDisCountPicker"
        @confirm="_pickDisCount"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 选择打卡 -->
    <van-popup position="top" safe-area-inset-bottom v-model="showClockInPopup">
      <van-checkbox-group class="cache-list" v-model="cache">
        <van-cell-group>
          <van-cell
            :key="index"
            :title="item.name"
            @click="_toggle(index)"
            clickable
            v-for="(item, index) in clockInList"
          >
            <van-checkbox :name="item.id" ref="checkboxes" slot="right-icon"></van-checkbox>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <van-row>
        <van-col span="12">
          <van-button @click="_controlClockInPopup">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_pickClockIn" type="primary">确定</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
// import areaData from '@/assets/js/area'
import AreaPicker from '@/components/AreaPicker'
import ImgCropper from '@/components/ImgCropper'
import CoordinatePicker from '@/components/CoordinatePicker'
import QuillEditor from '@/components/QuillEditor'
// import Utils from '@/utils/index'
export default {
  name: 'storeFrontCRU',

  mixins: [],

  components: {
    AreaPicker,
    ImgCropper,
    CoordinatePicker,
    QuillEditor,
  },

  props: {},

  data() {
    return {
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
        clock_in_type: [],
      },
      // 默认数据
      shop_logo: [],
      pic: [],
      qrcode_backgroup: [],
      // 店铺业务pickerData
      businessColumns: [
        { label: '标准', value: 'have_service' },
        { label: '外卖', value: 'have_peisong' },
        { label: '餐饮', value: 'have_meal' },
        { label: '酒店', value: 'have_hotel' },
        { label: '汽配', value: 'have_auto_parts' },
      ],
      // 优惠类型pickerData
      disCountColumns: [
        { label: '无优惠', value: '0' },
        { label: '折扣', value: '1' },
        { label: '满减', value: '2' },
      ],
      // 店铺分类数据，用于更改一级分类时遍历出二级分类
      storeFrontCategoryOrigin: [],
      // 用于picker的店铺分类数据
      storeFrontCategory: [],
      // 控制开关
      showCoordinatePicker: false,
      showBusinessPicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      showStoreFrontCategory: false,
      showDisCount: false,
      showClockInPopup: false,
      // 锁
      loading: false,
      // 后续需要后台更改的字段
      businessValue: '',
      defaultArea: null,
      clockInList: [],
      cache: [],
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    // 店铺地址非空验证
    coordinateLabel() {
      if (!this.formData.long || !this.formData.lat) return ''
      return this.formData.long + ', ' + this.formData.lat
    },
    // 店铺业务非空验证
    businessLabel() {
      const item = this.businessColumns.find(item => item.value === this.businessValue)
      return item && item.label
    },
    // 店铺分类非空验证
    storeFrontCategoryLabel() {
      let resultStr = ''
      const item = this.storeFrontCategoryOrigin.find(item => item.value === this.formData.cat_fid)
      if (item) {
        resultStr = item.label
        if (item.children) {
          const { label } = item.children.find(item => item.value === this.formData.cat_id)
          resultStr += ' / ' + label
        }
      }
      return resultStr
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
      return item && item.label
    },
    // 店铺业务默认数据
    storeBussinessIndex() {
      const index = this.businessColumns.findIndex(item => {
        return item.value === this.businessValue
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
      this._readStoreFrontDetail(id)
    } else {
      this._getPlatformStoreFrontCategory()
      this.getClockInList().then(res => {
        this.clockInList = res
      })
    }
  },

  destroyed() {},

  methods: {
    ...mapActions('storeFront', [
      'createStoreFront',
      'readStoreFrontDetail',
      'updateStoreFront',
      'getPlatformStoreFrontCategory',
      'getClockInList',
    ]),
    // 坐标拾取
    _controlCoordinatePicker() {
      this.showCoordinatePicker = !this.showCoordinatePicker
    },
    // 店铺业务开关
    _controlBusinessPicker() {
      const { id } = this.$route.params
      if (id && this.businessLabel) return
      this.showBusinessPicker = !this.showBusinessPicker
    },
    // 店铺分类开关
    _controlStoreFrontCategoryPicker() {
      this.showStoreFrontCategory = !this.showStoreFrontCategory
    },
    // 开始时间开关
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    // 结束时间开关
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    // 优惠类型开关
    _controlDisCountPicker() {
      this.showDisCount = !this.showDisCount
    },
    _controlClockInPopup() {
      this.showClockInPopup = !this.showClockInPopup
    },
    _pickClockIn() {
      const arr = []
      this.cache.forEach(item => {
        arr.push(item)
      })
      this.formData.clock_in_type = arr
      this._controlClockInPopup()
    },
    // 生成店铺业务第二行数据
    _changeStoreFrontCategory(picker, values) {
      if (values[0].children) {
        picker.setColumnValues(1, values[0].children)
      } else {
        picker.setColumnValues(1, [])
      }
    },
    // 地区选择
    _pickArea(data) {
      this.formData.province_id = data[0].value
      this.formData.city_id = data[1].value
      this.formData.area_id = data[2].value
      this.formData.circle_id = ''
      this.formData.market_id = ''
    },
    // 商圈选择
    _pickCircle(data) {
      this.formData.circle_id = data.value
    },
    // 商盟选择
    _pickMarket(data) {
      this.formData.market_id = data.value
    },
    // 坐标选择
    _pickCoordinate(lng, lat) {
      this.formData.long = lng
      this.formData.lat = lat
      this._controlCoordinatePicker()
    },
    // 店铺业务选择
    _pickBusiness(data) {
      this.businessValue = data.value
      // 特殊处理。。
      this.showBusinessPicker = !this.showBusinessPicker
    },
    // 店铺分类选择
    _pickStoreFrontCategory(data) {
      this.formData.cat_fid = data[0].value
      if (data[1]) {
        this.formData.cat_id = data[1].value
      } else {
        this.formData.cat_id = ''
      }
      this._controlStoreFrontCategoryPicker()
    },
    // 开始时间选择
    _pickStartTime(data) {
      this.formData.open_1 = data
      this._controlStartTimePicker()
    },
    // 结束时间选择
    _pickEndTime(data) {
      this.formData.close_1 = data
      this._controlEndTimePicker()
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
      this._controlDisCountPicker()
    },
    _changeHtml(data) {
      this.formData.context = data.html
    },
    // 获取打卡名称
    _clockLabel(id) {
      const item = this.clockInList.find(item => item.id === id)
      return item && item.name
    },
    // 打卡checkbox选中状态切换
    _toggle(index, flag) {
      // 判断是否选可选
      !flag && this.$refs.checkboxes[index].toggle()
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
    // 获取店铺默认数据
    _readStoreFrontDetail(id) {
      this.readStoreFrontDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        // 默认数据塞入
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        // 主店
        this.formData.ismain = res.ismain === '1'
        // logo图片
        this.shop_logo = [
          {
            url: res.shop_logo,
          },
        ]
        // 店铺图片
        this.pic = res.pic
        // 二维码图片
        this.qrcode_backgroup = [
          {
            url: res.qrcode_backgroup,
          },
        ]

        this.clockInList = res.clock_in_type_arr

        // 设置默认选中的打卡
        const cache = []
        res.clock_in_type.forEach(item => {
          const result = this.clockInList.find(i => i.id === item)
          result && cache.push(result.id)
        })
        this.cache = cache

        // { label: '标准', value: 'have_service' },
        // { label: '外卖', value: 'have_peisong' },
        // { label: '餐饮', value: 'have_meal' },
        // { label: '酒店', value: 'have_hotel' },
        // { label: '汽配', value: 'have_auto_parts' },

        if (res.have_service === '1' && res.have_mall === '1' && res.have_shop === '1') {
          this.businessValue = 'have_service'
        } else if (res.have_peisong === '1' && res.have_shop === '1') {
          this.businessValue = 'have_peisong'
        } else if (res.have_meal === '1') {
          this.businessValue = 'have_meal'
        } else if (res.have_hotel === '1') {
          this.businessValue = 'have_hotel'
        } else if (res.have_auto_parts === '1') {
          this.businessValue = 'have_auto_parts'
        }
        // 获取平台分类数据
        this._getPlatformStoreFrontCategory(res.cat_fid, res.cat_id)
        this.defaultArea = [res.province_id, res.city_id, res.area_id, res.circle_id, res.market_id]
        this.$nextTick(function() {
          this.$refs.editor.$refs.quillEditor.quill.blur()
          window.scroll(0, 0)
        })
      })
    },
    // 提交数据
    async _submit() {
      // 锁
      if (this.loading) return
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      // 表单不完整
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        if (!this.$refs.editor.editorHtml) {
          this.$notify({
            type: 'warning',
            message: '请填写完整信息',
          })
        } else {
          // 加锁
          this.loading = true
          // 表单完整，进行数据修改并提交
          const params = JSON.parse(JSON.stringify(this.formData))
          params.ismain ? (params.ismain = '1') : (params.ismain = '0')
          params.pic = params.pic.map(item => {
            if (item.url) return item.url
            return item
          })
          params.have_service = '0'
          params.have_peisong = '0'
          params.have_meal = '0'
          params.have_hotel = '0'
          params.have_auto_parts = '0'
          params[this.businessValue] = '1'
          if (this.businessValue === 'have_service') {
            params.have_mall = '1'
            params.have_shop = '1'
          }
          if (this.businessValue === 'have_peisong') {
            params.have_shop = '1'
          }
          let method = 'createStoreFront'
          const { id } = this.$route.params
          if (id) {
            method = 'updateStoreFront'
            params.store_id = id
          }
          const toast = this.$toast.loading({
            message: '加载中...',
            forbidClick: true,
          })
          this[method](params)
            .then(() => {
              toast.clear()
              this.$toast.success({
                message: '操作成功',
                forbidClick: true,
                duration: 1000,
                onClose: () => {
                  // 解锁
                  this.loading = false
                  this.$goBack()
                },
              })
            })
            .catch(() => {
              toast.clear()
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

.van-popup {
  .cache-list {
    height: 65vh;
    overflow: scroll;
  }
  .van-button {
    width: 100%;
  }
}
</style>
