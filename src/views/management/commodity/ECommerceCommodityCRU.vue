<template>
  <div>
    <van-nav-bar :title="`${type}电商商品`" @click-left="_goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" tag="form" v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="商品名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="商品名称"
            placeholder="电商商品名称"
            required
            v-model.trim="formData.name"
          />
        </ValidationProvider>
        <ValidationProvider name="条形码" rules="alpha_num" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="条形码" placeholder="条形码数字（选填）" v-model.trim="formData.number" />
        </ValidationProvider>
        <ValidationProvider name="计数单位" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="计数单位"
            placeholder="如：个、斤、份"
            required
            v-model.trim="formData.unit"
          />
        </ValidationProvider>
        <ValidationProvider name="原价" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="原价"
            placeholder="用于展示给用户看"
            required
            type="number"
            v-model.trim="formData.old_price"
          />
        </ValidationProvider>
        <ValidationProvider name="现价" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="现价"
            placeholder="真实销售价"
            required
            type="number"
            v-model.trim="formData.price"
          />
        </ValidationProvider>
        <ValidationProvider name="库存" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="库存"
            placeholder="库存量"
            required
            type="number"
            v-model.trim="formData.stock_num"
          />
        </ValidationProvider>
        <van-field
          :value="statusLabel"
          @click="_controlStatusPicker"
          error-message-align="right"
          input-align="right"
          is-link
          label="状态"
          readonly
        />
        <van-field
          :value="typesLabel"
          @click="_controlTypesPicker"
          error-message-align="right"
          input-align="right"
          is-link
          label="类型"
          readonly
        />
        <ValidationProvider name="商家分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel"
            @click="_controlCategoryPicker"
            @click-left-icon.stop="$toast('商家自定义的分类')"
            error-message-align="right"
            input-align="right"
            is-link
            label="所属分类"
            left-icon="question-o"
            placeholder="选择分类"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="商城分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="platformCategoryLabel"
            @click="_controlPlatformCategoryPicker"
            @click-left-icon.stop="$toast('平台商城的分类，用于商城内分类管理')"
            error-message-align="right"
            input-align="right"
            is-link
            label="所属商城分类"
            left-icon="question-o"
            placeholder="选择商城分类"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="运费模版" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="freightTemplateLabel"
            @click="_controlFreightTemplatePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="运费模版"
            placeholder="选择运费模版"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="其他区域运费" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="其他区域运费"
            placeholder="其他区域运费"
            required
            type="number"
            v-model.trim="formData.freight_value"
          />
        </ValidationProvider>
        <van-field
          :value="freightTypeLabel"
          @click="_controlFreightTypePicker"
          error-message-align="right"
          input-align="right"
          is-link
          label="运费计算方式"
          readonly
        />
        <img-cropper :confirm="_pickPic" field="商品图片" title="商品图片"></img-cropper>
        <van-cell required title="店铺详情"></van-cell>
        <quill-editor ref="myQuillEditor" v-model.trim="formData.des"></quill-editor>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 商品状态 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStatusPicker">
      <van-picker
        :columns="statusColumns"
        :default-index="statusIndex"
        @cancel="_controlStatusPicker"
        @confirm="_pickStatus"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 商品类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTypesPicker">
      <van-picker
        :columns="typesColumns"
        :default-index="typesIndex"
        @cancel="_controlTypesPicker"
        @confirm="_pickTypes"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 所属分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCategoryPicker">
      <van-picker
        :columns="categoryColumns"
        :default-index="categoryIndex"
        @cancel="_controlCategoryPicker"
        @change="_changeCategory"
        @confirm="_pickCategory"
        show-toolbar
        value-key="sort_id"
      ></van-picker>
    </van-popup>
    <!-- 所属商城分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showPlatformCategoryPicker">
      <van-picker
        :columns="platFormCategoryColumns"
        :default-index="platformIndex"
        @cancel="_controlPlatformCategoryPicker"
        @change="_changePlatFormCategory"
        @confirm="_pickPlatformCategory"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 运费模版 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showFreightTemplate">
      <van-picker
        :columns="freightTemplateColumns"
        :default-index="freightTemplateIndex"
        @cancel="_controlFreightTemplatePicker"
        @confirm="_pickFreightTemplate"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 运费计算方式 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showFreightType">
      <van-picker
        :columns="freightTypeColumns"
        :default-index="freightTypeIndex"
        @cancel="_controlFreightTypePicker"
        @confirm="_pickFreightType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'

export default {
  name: '',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        name: '',
        number: '',
        unit: '',
        old_price: '',
        price: '',
        stock_num: '',
        status: '1',
        goods_type: '0',
        sort_id: '',
        freight_template: '',
        freight_value: '',
        freight_type: '0',
        pic: [],
        cat_fid: '',
        cat_id: '',
        des: '',
      },
      statusColumns: [{ label: '在售', value: '1' }, { label: '停售', value: '0' }],
      typesColumns: [{ label: '实体商品', value: '0' }, { label: '虚拟商品', value: '1' }],
      freightTemplateColumns: [],
      freightTypeColumns: [{ label: '按订单最大值', value: '0' }, { label: '单独计算', value: '1' }],
      categoryColumnsOrigin: [],
      categoryColumns: [],
      platFormCategoryColumnsOrigin: [],
      platFormCategoryColumns: [],
      showStatusPicker: false,
      showTypesPicker: false,
      showCategoryPicker: false,
      showPlatformCategoryPicker: false,
      showFreightTemplate: false,
      showFreightType: false,
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    // 商品状态
    statusLabel() {
      const { label } = this.statusColumns.find(item => item.value === this.formData.status)
      return label
    },
    // 商品状态默认数据
    statusIndex() {
      const index = this.statusColumns.findIndex(item => item.value === this.formData.status)
      return index
    },
    // 商品类型
    typesLabel() {
      const { label } = this.typesColumns.find(item => item.value === this.formData.goods_type)
      return label
    },
    // 商品类型默认数据
    typesIndex() {
      const index = this.statusColumns.findIndex(item => item.value === this.formData.status)
      return index
    },
    // 商品分类默认数据
    categoryIndex() {
      return 0
    },
    // 商城商品分类默认数据
    platformIndex() {
      return 0
    },
    // 运费模版默认数据
    freightTemplateIndex() {
      return 0
    },
    // 运费计算方式默认数据
    freightTypeIndex() {
      return 0
    },
    // 所属电商分类非空验证
    categoryLabel() {
      return ''
    },
    // 平台商城电商分类非空验证
    platformCategoryLabel() {
      let resultStr = ''
      const item = this.platFormCategoryColumnsOrigin.find(item => item.value === this.formData.cat_fid)
      if (item) {
        resultStr = item.label
        if (item.children) {
          const { label } = item.children.find(item => item.value === this.formData.cat_id)
          resultStr += ' / ' + label
        }
      }
      return resultStr
    },
    // 运费模版非空验证
    freightTemplateLabel() {
      const item = this.freightTemplateColumns.find(item => item.value === this.formData.freight_template)
      return item && item.label
    },
    // 运费计算方式非空验证
    freightTypeLabel() {
      const item = this.freightTypeColumns.find(item => item.value === this.formData.freight_type)
      return item && item.label
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getFreightTemPlateList()
    this._getECommerceCommodityFirstCategoryList()
    this._getPlatformECommerceCommodityCategoryList()
  },

  destroyed() {},

  methods: {
    ...mapActions('commodity', ['getECommerceCommodityFirstCategoryList', 'getPlatformEcommerceCommodityCategoryList']),
    ...mapActions('freight', ['getFreightTemPlateList']),
    // 商品状态开关
    _controlStatusPicker() {
      this.showStatusPicker = !this.showStatusPicker
    },
    // 商品类型开关
    _controlTypesPicker() {
      this.showTypesPicker = !this.showTypesPicker
    },
    // 商品分类选择开关
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    // 平台商城 商品分类 选择开关
    _controlPlatformCategoryPicker() {
      this.showPlatformCategoryPicker = !this.showPlatformCategoryPicker
    },
    // 运费模版开关
    _controlFreightTemplatePicker() {
      this.showFreightTemplate = !this.showFreightTemplate
    },
    // 运费计算方式开关
    _controlFreightTypePicker() {
      this.showFreightType = !this.showFreightType
    },
    // 商品状态选择
    _pickStatus(data) {
      this.formData.status = data.value
      this._controlStatusPicker()
    },
    // 商品类型选择
    _pickTypes(data) {
      this.formData.goods_type = data.value
      this._controlTypesPicker()
    },
    // 商品分类选择
    _pickCategory(data) {
      this.formData.sort_id = data.value
      this._controlCategoryPicker()
    },
    // 平台商城 商品分类 选择开关
    _pickPlatformCategory(data) {
      this.formData.cat_fid = data[0].value
      if (data[1]) {
        this.formData.cat_id = data[1].value
      } else {
        this.formData.cat_id = ''
      }
      this._controlPlatformCategoryPicker()
    },
    // 生成商品分类 第二行数据
    _changeCategory(picker, values) {
      picker.setColumnValues(1, values[0].children)
    },
    // 生成平台商城 商品分类 第二行数据
    _changePlatFormCategory(picker, values) {
      if (values[0].children) {
        picker.setColumnValues(1, values[0].children)
      } else {
        picker.setColumnValues(1, [])
      }
    },
    // 运费模版选择
    _pickFreightTemplate(data) {
      this.formData.freight_template = data.value
      this._controlFreightTemplatePicker()
    },
    // 运费计算方式选择
    _pickFreightType(data) {
      this.formData.freight_type = data.value
      this._controlFreightTypePicker()
    },
    // 商品图片截取
    _pickPic(data) {
      this.formData.pic = data.map(item => item.url)
    },
    // 读取商品分类
    _getECommerceCommodityFirstCategoryList(fid, id) {
      this.getECommerceCommodityFirstCategoryList().then(res => {
        this.categoryColumnsOrigin = res
        this._serializationECommerceCategory(fid, id)
      })
    },
    // 读取平台平台商城 商品分类
    _getPlatformECommerceCommodityCategoryList(fid, id) {
      this.getPlatformEcommerceCommodityCategoryList().then(res => {
        this.platFormCategoryColumnsOrigin = res
        this._serializationPlatformECommerceCategory(fid, id)
      })
    },
    // 读取运费模版列表
    _getFreightTemPlateList() {
      this.getFreightTemPlateList().then(res => {
        this.freightTemplateColumns = res
      })
    },
    // 序列化商品分类
    _serializationECommerceCategory(fid, id) {
      const data = this.categoryColumnsOrigin
      let index1 = 0
      let index2 = 0
      if (fid && id) {
        index1 = data.findIndex(item => item.value === fid) >= 0 ? data.findIndex(item => item.value === fid) : 0
        index2 =
          data[index1].children.findIndex(item => item.value === id) >= 0
            ? data[index1].children.findIndex(item => item.value === id)
            : 0
      }
      this.categoryColumns = [
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
    // 序列化平台商城 商品分类
    _serializationPlatformECommerceCategory(fid, id) {
      const data = this.platFormCategoryColumnsOrigin
      let index1 = 0
      let index2 = 0
      if (fid && id) {
        index1 = data.findIndex(item => item.value === fid) >= 0 ? data.findIndex(item => item.value === fid) : 0
        index2 =
          data[index1].children.findIndex(item => item.value === id) >= 0
            ? data[index1].children.findIndex(item => item.value === id)
            : 0
      }
      this.platFormCategoryColumns = [
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
    // 提交表单
    _submit() {
      console.log(this.formData)
    },
  },
}
</script>

<style lang="less" scoped></style>
