<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
      title="电商业务配置"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <img-cropper
          :confirm="_pickPic"
          :list="picList"
          :ratio="[2, 1]"
          field="商户背景图"
          title="商户背景图"
        ></img-cropper>
        <van-cell title="开发票">
          <van-switch active-value="1" inactive-value="0" v-model="formData.is_invoice" />
        </van-cell>
        <ValidationProvider
          name="开票条件"
          rules="required"
          slim
          v-if="formData.is_invoice === '1'"
          v-slot="{ errors }"
        >
          <van-field :error-message="errors[0]" label="开票条件" required v-model="formData.invoice_price" />
        </ValidationProvider>
        <ValidationProvider name="商城分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="formData.store_category.length ? '1' : ''"
            @click="_controlPlatFormCategoryPopup"
            error-message-align="right"
            input-align="right"
            is-link
            label="所属商城分类"
            placeholder="请选择"
            readonly
            required
          >
            <div slot="input" v-if="formData.store_category.length">
              <div :key="index" v-for="(item, index) in formData.store_category">{{ _getCateName(item) }}</div>
            </div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="优惠方式" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="disCountLabel"
            @click="_controlDiscountTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="优惠方式"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider
          name="店铺折扣"
          rules="required|decimal-max2|min_value:0|max_value:10"
          slim
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            label="店铺折扣"
            placeholder="请填写店铺折扣"
            required
            type="number"
            v-model.trim="formData.store_discount"
          />
        </ValidationProvider>
        <ValidationProvider name="库存类型" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="stockTypeLabel"
            @click="_controlStockTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="库存类型"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="减库存类型" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="reduceTypeLabel"
            @click="_controlReduceTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="减库存类型"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="买单时长" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="买单时长"
            placeholder="单位：分钟"
            required
            type="number"
            v-model.trim="formData.rollback_time"
          />
        </ValidationProvider>
        <van-cell title="店铺二维码">
          <img :src="qrcode" @click="_preView" alt class="qrcode" />
        </van-cell>
        <van-field
          autosize
          label="店铺公告"
          placeholder="店铺首页展示公告"
          rows="2"
          type="textarea"
          v-model.trim="formData.store_notice"
        />
      </van-cell-group>
      <van-cell-group title="会员等级优惠">
        <div :key="index" v-for="(item, index) in levelDom">
          <van-field
            :label="item.name"
            :value="label[item.type]"
            @click="_controlMemberDiscountPicker(item, index)"
            error-message-align="right"
            input-align="right"
            is-link
            placeholder="请选择"
            readonly
            required
          />
          <ValidationProvider name="减库存类型" rules="required" slim v-if="item.type === '1'" v-slot="{ errors }">
            <van-field label="优惠数值" placeholder="请填写优惠值" v-model="item.vv" />
          </ValidationProvider>
        </div>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 优惠方式 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showDiscountTypePicker">
      <van-picker
        :columns="discountTypeColumns"
        :default-index="discountTypeIndex"
        @cancel="_controlDiscountTypePicker"
        @confirm="_pickDiscountType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 库存类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStockTypePicker">
      <van-picker
        :columns="stockColumns"
        :default-index="stockTypeIndex"
        @cancel="_controlStockTypePicker"
        @confirm="_pickStockType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 减库存类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showReduceTypePicker">
      <van-picker
        :columns="reduceTypeColumns"
        :default-index="reduceTypeIndex"
        @cancel="_controlReduceTypePicker"
        @confirm="_pickReduceType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 会员优惠类型 -->
    <van-popup :lazy-render="false" position="bottom" safe-area-inset-bottom v-model="showMemberDiscountPicker">
      <van-picker
        :columns="memberDiscountColumns"
        @cancel="_controlMemberDiscountPicker()"
        @confirm="_pickMemberDiscount"
        ref="memberDiscount"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 店铺所属商城分类 -->
    <van-popup position="top" safe-area-inset-bottom v-model="showPlatFormCategoryPopup">
      <van-tree-select
        :active-id.sync="formData.store_category"
        :height="450"
        :items="categoryTree"
        :main-active-index.sync="activeIndex"
      />
      <van-button @click="_controlPlatFormCategoryPopup">关闭</van-button>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ImagePreview } from 'vant'
import ImgCropper from '@/components/ImgCropper'

export default {
  name: 'eCommerceSettingCRU',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        background: '',
        is_invoice: '0',
        invoice_price: '',
        discount_type: '0',
        store_discount: '',
        stock_type: '',
        reduce_stock_type: 0,
        rollback_time: '',
        store_notice: '',
        leveloff: [],
        store_category: [],
      },
      showDiscountTypePicker: false,
      showStockTypePicker: false,
      showReduceTypePicker: false,
      showMemberDiscountPicker: false,
      showPlatFormCategoryPopup: false,
      discountTypeColumns: [
        {
          label: '折上折',
          value: '0',
        },
        {
          label: '折扣最优',
          value: '1',
        },
      ],
      stockColumns: [
        {
          label: '每天自动更新固定量的库存',
          value: '0',
        },
        {
          label: '固定库存，不会每天自动更新',
          value: '1',
        },
      ],
      reduceTypeColumns: [
        {
          label: '支付成功后减库存',
          value: '0',
        },
        {
          label: '下单成功后减库存',
          value: '1',
        },
      ],
      memberDiscountColumns: [
        {
          label: '无优惠',
          value: '0',
        },
        {
          label: '百分比(%)',
          value: '1',
        },
      ],
      label: ['无优惠', '百分比%'],
      picList: [],
      levelDom: [],
      lastLevel: 0,
      qrcode: '',
      loading: false,
      categoryTree: [],
      activeIndex: 0,
    }
  },

  computed: {
    disCountLabel() {
      const item = this.discountTypeColumns.find(item => item.value === this.formData.discount_type)
      return item && item.label
    },
    discountTypeIndex() {
      const index = this.discountTypeColumns.findIndex(item => item.value === this.formData.discount_type)
      return index
    },
    stockTypeLabel() {
      const item = this.stockColumns.find(item => item.value === this.formData.stock_type)
      return item && item.label
    },
    stockTypeIndex() {
      const index = this.stockColumns.findIndex(item => item.value === this.formData.stock_type)
      return index
    },
    reduceTypeLabel() {
      const item = this.reduceTypeColumns.find(item => item.value === this.formData.reduce_stock_type)
      return item && item.label
    },
    reduceTypeIndex() {
      const index = this.reduceTypeColumns.findIndex(item => item.value === this.formData.reduce_stock_type)
      return index
    },
  },

  watch: {},

  created() {},

  async mounted() {
    await this.getUserLevel().then(res => {
      this.levelDom = res.map(item => {
        return {
          id: item.id,
          name: item.name,
          vv: '',
          type: '0',
        }
      })
    })
    const { id } = this.$route.params
    id &&
      this.getStoreFrontBusinessDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res.store_shop[item]
        })
        res.store_shop.background && (this.picList = [{ url: res.store_shop.background }])
        this.formData.store_category = res.relation_array
        res.store_shop.leveloff &&
          res.store_shop.leveloff.forEach(item => {
            this.levelDom.find(level => {
              if (level.id === item.id) {
                level.type = item.type + ''
                level.vv = item.vv + ''
              }
            })
          })
        const tree = res.category_list.map(item => {
          let children = []
          if (item.son_list) {
            children = item.son_list.map(child => {
              return {
                text: child.cat_name,
                id: `${item.cat_id}-${child.cat_id}`,
              }
            })
          }
          return {
            text: item.cat_name,
            children,
          }
        })
        this.categoryTree = tree
      })

    id &&
      this.getStoreFrontQRCode(id).then(res => {
        this.qrcode = res
      })
  },

  destroyed() {},

  methods: {
    ...mapActions(['getUserLevel']),
    ...mapActions('storeFront', [
      'getStoreFrontBusinessDetail',
      'getStoreFrontQRCode',
      'updateStoreFrontBusinessDetail',
    ]),
    _controlDiscountTypePicker() {
      this.showDiscountTypePicker = !this.showDiscountTypePicker
    },
    _controlStockTypePicker() {
      this.showStockTypePicker = !this.showStockTypePicker
    },
    _controlReduceTypePicker() {
      this.showReduceTypePicker = !this.showReduceTypePicker
    },
    _controlPlatFormCategoryPopup() {
      this.showPlatFormCategoryPopup = !this.showPlatFormCategoryPopup
    },
    _controlMemberDiscountPicker(data, index) {
      if (data) {
        this.$refs.memberDiscount.setIndexes([data.type])
      }
      index && (this.lastLevel = index)
      this.showMemberDiscountPicker = !this.showMemberDiscountPicker
    },
    _pickDiscountType(data) {
      this.formData.discount_type = data.value
      this._controlDiscountTypePicker()
    },
    _pickStockType(data) {
      this.formData.stock_type = data.value
      this._controlStockTypePicker()
    },
    _pickReduceType(data) {
      this.formData.reduce_stock_type = data.value
      this._controlReduceTypePicker()
    },
    _pickMemberDiscount(data) {
      this.levelDom[this.lastLevel].type = data.value
      this._controlMemberDiscountPicker()
    },
    _pickPic(data) {
      this.formData.background = data[0].url
    },
    // 预览二维码
    _preView() {
      ImagePreview({
        images: [this.qrcode],
        showIndex: false,
      })
    },
    _getCateName(id) {
      let name = ''
      for (let i = 0; i < this.categoryTree.length; i++) {
        for (let j = 0; j < this.categoryTree[i].children.length; j++) {
          if (this.categoryTree[i].children[j].id === id) {
            name = this.categoryTree[i].children[j].text
            return name
          }
        }
      }
    },
    // 提交表单
    async _submit() {
      // 锁
      if (this.loading) return
      // 验证表单
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        // 加锁
        this.loading = true
        const params = JSON.parse(JSON.stringify(this.formData))
        params.leveloff = this.levelDom
        params.store_id = this.$route.params.id
        this.updateStoreFrontBusinessDetail(params)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this.$goBack()
              },
            })
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
.qrcode {
  width: 44vw;
}

.van-popup {
  .van-button {
    width: 100%;
  }
}
</style>
