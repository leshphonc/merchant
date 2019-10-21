<template>
  <van-popup class="container" position="bottom" safe-area-inset-bottom v-model="show">
    <vue-cropper :img="img" :outputSize="0.3" autoCrop centerBox class="cropper" ref="cropper"></vue-cropper>
    <van-row>
      <van-col span="12">
        <van-button @click="cancel">取消</van-button>
      </van-col>
      <van-col span="12">
        <van-button @click="_cropper" type="primary">截图</van-button>
      </van-col>
    </van-row>
  </van-popup>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import Utils from '@/utils/index'
import axios from 'axios'

export default {
  name: 'vueCropper',

  mixins: [],

  components: {
    VueCropper,
  },

  props: {
    show: Boolean,
    img: [File, String, Array],
    cancel: Function,
  },

  data() {
    return {}
  },

  computed: {},

  watch: {},

  created() {},

  mounted() {},

  destroyed() {},

  methods: {
    _cropper() {
      this.$refs.cropper.getCropData(data => {
        axios
          .post('/appapi.php?c=Merchantapp&a=base64change', {
            imgBase: data,
            ticket: localStorage.getItem('ticket'),
          })
          .then(res => {
            this.control(res)
          })
          .catch(e => {
            console.log(e)
          })
      })
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

<style lang="less" scoped>
.container {
  height: 100%;

  .van-button {
    width: 100%;
  }

  .cropper {
    height: calc(100% - 44px);
  }
}
</style>
