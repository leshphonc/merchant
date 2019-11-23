<template>
  <div>
    <van-nav-bar :title="`${type}礼品`" @click-left="$goBack" fixed left-arrow></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="礼品名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="礼品名称"
            placeholder="请输入礼品名称"
            required
            v-model.trim="formData.gift_name"
          />
        </ValidationProvider>
        <ValidationProvider name="礼品分类" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel1"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择分类"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="分类产品" rules="required" slim v-if="categoryLabel1" v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="categoryLabel2"
            error-message-align="right"
            input-align="right"
            is-link
            label="选择分类产品"
            placeholder="请选择"
            readonly
            required
          />
        </ValidationProvider>
        <van-cell title="是否到店自提">
          <van-switch v-model="formData.pick_in_store" />
        </van-cell>
        <area-picker
          :data="defaultArea"
          :pickArea="_pickArea"
          :pickCircle="_pickCircle"
          :pickMarket="_pickMarket"
          title="兑换地区"
        ></area-picker>
      </van-cell-group>
    </ValidationObserver>
  </div>
</template>

<script>
import AreaPicker from '@/components/AreaPicker'
export default {
  name: 'giftCRU',

  mixins: [],

  components: {
    AreaPicker,
  },

  props: {},

  data() {
    return {
      formData: {
        gift_name: '',
        cat_fid: '',
        cat_id: '',
        pick_in_store: false,
        store: [],
        province_idss: '',
        city_idss: '',
        area_idss: '',
        circle_idss: '',
        market_idss: '',
        worth: '',
        sku: '',
        wap_pic: [],
        intro: '',
        specification: '',
        invoice_content: '',
        gift_content: '',
      },
      defaultArea: null,
    }
  },

  computed: {
    type() {
      const { id } = this.$route.params
      return id ? '编辑' : '创建'
    },
    categoryLabel1() {
      return ''
    },
    categoryLabel2() {
      return ''
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _pickArea(data) {
      this.formData.province_idss = data[0].value
      this.formData.city_idss = data[1].value
      this.formData.area_idss = data[2].value
      console.log(data)
    },
    _pickCircle(data) {
      this.formData.circle_idss = data.value
    },
    _pickMarket(data) {
      this.formData.market_idss = data.value
    },
  },
}
</script>

<style lang="less" scoped></style>
