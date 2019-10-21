<template>
  <van-cell title="店铺图片">
    <van-uploader :before-read="_beforeRead" :max-count="imgCount" v-model="storeFrontPic" />
    <vue-cropper :close="_closePopup" :img="uploadImg" :show="showCropperPopup"></vue-cropper>
  </van-cell>
</template>

<script>
import VueCropper from './VueCopper'
import Utils from '@/utils'

export default {
  name: 'singleImgCropper',

  mixins: [],

  components: {
    VueCropper,
  },

  props: {
    imgCount: {
      type: Number,
      default: 1,
    },
  },

  data() {
    return {
      storeFrontPic: [],
      showCropperPopup: false,
      uploadImg: '',
    }
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _beforeRead(data) {
      Utils.fileConversionToBase64(data).then(res => {
        this.uploadImg = res
        this.showCropperPopup = true
      })
      return false
    },
    _closePopup() {
      this.showCropperPopup = false
    },
  },
}
</script>

<style lang="less" scoped></style>
