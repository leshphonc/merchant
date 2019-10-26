<template>
  <div>
    <van-nav-bar :title="`${type}电商商品`" @click-left="_goBack" fixed left-arrow></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver @submit.prevent="_submit" ref="observer" tag="form" v-slot="{ invalid }">
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
        <ValidationProvider name="价格" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="价格"
            placeholder="价格"
            required
            type="number"
            v-model.trim="formData.old_price"
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
        :columns="typesColumns"
        :default-index="typesIndex"
        @cancel="_controlCategoryPicker"
        @confirm="_pickCategory"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 所属商城分类 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showPlatformCategoryPicker">
      <van-picker
        :columns="typesColumns"
        :default-index="typesIndex"
        @cancel="_controlPlatformCategoryPicker"
        @confirm="_pickPlatformCategory"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
export default {
  name: '',

  mixins: [],

  components: {},

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
        freight_type: '',
        pic: [],
        cat_fid: '',
        cat_id: '',
        des: '',
      },
      statusColumns: [{ label: '在售', value: '1' }, { label: '停售', value: '0' }],
      typesColumns: [{ label: '实体商品', value: '0' }, { label: '虚拟商品', value: '1' }],
      showStatusPicker: false,
      showTypesPicker: false,
      showCategoryPicker: false,
      showPlatformCategoryPicker: false,
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
    // 所属电商分类非空验证
    categoryLabel() {
      return ''
    },
    // 平台商城电商分类非空验证
    platformCategoryLabel() {
      return ''
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _controlStatusPicker() {
      this.showStatusPicker = !this.showStatusPicker
    },
    _controlTypesPicker() {
      this.showTypesPicker = !this.showTypesPicker
    },
    _controlCategoryPicker() {
      this.showCategoryPicker = !this.showCategoryPicker
    },
    _controlPlatformCategoryPicker() {
      this.showPlatformCategoryPicker = !this.showPlatformCategoryPicker
    },
    _pickStatus(data) {
      this.formData.status = data.value
      this._controlStatusPicker()
    },
    _pickTypes(data) {
      this.formData.goods_type = data.value
      this._controlTypesPicker()
    },
    _pickCategory(data) {
      this.formData.sort_id = data.value
      this._controlCategoryPicker()
    },
    _pickPlatformCategory(data) {
      this.formData.sort_id = data.value
      this._controlPlatformCategoryPicker()
    },
  },
}
</script>

<style lang="less" scoped></style>
