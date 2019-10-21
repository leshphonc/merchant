<template>
  <div>
    <van-nav-bar :title="`${type}店铺`" @click-left="_goBack" fixed left-arrow></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group>
      <van-field label="店铺名称" placeholder="店铺名称" required v-model="formData.name" />
      <van-cell placeholder="请输入用户名" title="是否设置成主店">
        <van-switch size="20px" slot="default" v-model="formData.ismain"></van-switch>
      </van-cell>
      <van-field label="联系电话" placeholder="联系电话" required type="tel" v-model="formData.phone" />
      <van-cell :value="areaLabel" @click="_controlAreaPicker" is-link required title="店铺所在地"></van-cell>
      <van-cell :value="areaLabel" is-link required title="所处商圈" v-show="showCircle"></van-cell>
      <van-cell :value="addressLabel" is-link required title="所处商盟" v-show="showMarket"></van-cell>
      <van-field
        autosize
        label="详细地址"
        maxlength="100"
        required
        rows="2"
        show-word-limit
        type="textarea"
        v-model="formData.adress"
      ></van-field>
      <van-cell :value="addressLabel" is-link required title="地图位置"></van-cell>
      <van-field
        @click-right-icon="$toast('数值越大，排序越靠前')"
        label="店铺排序"
        required
        right-icon="question-o"
        v-model="formData.sort"
      ></van-field>
      <van-cell :value="addressLabel" is-link required title="店铺业务"></van-cell>
      <van-cell :value="startTimeLabel" @click="_controlStartTime" is-link required title="营业开始时间"></van-cell>
      <van-cell :value="endTimeLabel" @click="_controlEndTime" is-link required title="营业结束时间"></van-cell>
      <van-field
        autosize
        label="店铺描述"
        maxlength="100"
        required
        rows="2"
        show-word-limit
        type="textarea"
        v-model="formData.txt_info"
      ></van-field>
      <van-cell :value="addressLabel" is-link required title="店铺分类"></van-cell>
      <!-- <van-cell title="商户LOGO">
        <van-uploader v-model="shopLogo" :max-count="1" :before-read="_beforeRead" />
      </van-cell>
      <van-cell title="店铺图片">
        <van-uploader v-model="storeFrontPic" :max-count="5" :before-read="_beforeRead" />
      </van-cell>-->
    </van-cell-group>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showAreaPicker">
      <van-area :area-list="areaData" @cancel="_controlAreaPicker" @confirm="_pickArea" />
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker @cancel="_controlStartTime" @confirm="_pickStartTime" type="time" v-model="formData.open_1" />
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker @cancel="_controlEndTime" @confirm="_pickEndTime" type="time" v-model="formData.close_1" />
    </van-popup>
  </div>
</template>

<script>
import areaData from '@/assets/js/area'
import Utils from '@/utils/index'

export default {
  name: '',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      areaData,
      showAreaPicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      showCropper: false,
      area: [],
      shopLogo: [],
      storeFrontPic: [],
      ImgCropper: '',
      addressLabel: '请选择',
      formData: {
        name: '',
        ismain: '',
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
        shop_logo: this.getShopLogo,
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
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    areaLabel() {
      if (this.area.length) {
        return this.area[0].name + ' / ' + this.area[1].name + ' / ' + this.area[2].name
      }
      return '请选择'
    },
    startTimeLabel() {
      return this.formData.open_1 ? this.formData.open_1 : '请选择开始时间'
    },
    endTimeLabel() {
      return this.formData.close_1 ? this.formData.close_1 : '请选择开始时间'
    },
    showCircle() {
      return this.areaLabel !== '请选择'
    },
    showMarket() {
      return this.circleLabel !== '请选择'
    },
    getShopLogo() {
      return this.shopLogo.length ? this.shopLogo[0].url : ''
    },
  },

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _goBack() {
      this.$router.go(-1)
    },
    _controlAreaPicker() {
      this.showAreaPicker = !this.showAreaPicker
    },
    _controlStartTime() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    _controlEndTime() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    _controlImgCropper(data) {
      this.shopLogo.push({ url: data })
      this.showCropper = !this.showCropper
    },
    _pickArea(data) {
      this.area = data
      this.showAreaPicker = false
    },
    _pickStartTime(data) {
      this.formData.open_1 = data
      this._controlStartTime()
    },
    _pickEndTime(data) {
      this.formData.close_1 = data
      this._controlEndTime()
    },
    _beforeRead(data) {
      Utils.fileConversionToBase64(data).then(res => {
        this.ImgCropper = res
        this.showCropper = true
      })
      return false
    },
  },
}
</script>

<style lang="less" scoped></style>
