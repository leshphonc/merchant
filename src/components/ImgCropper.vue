<template>
  <div>
    <van-cell :required="required" :title="title" class="cell">
      <van-uploader :before-read="_beforeRead" :max-count="count" v-model="picList" />
    </van-cell>
    <van-popup class="popup" position="bottom" safe-area-inset-bottom v-model="showPopup">
      <vue-cropper
        :fixed="fixedRatio"
        :fixedNumber="ratio"
        :img="img"
        :outputSize="0.3"
        autoCrop
        centerBox
        class="cropper"
        ref="cropper"
      ></vue-cropper>
      <van-row>
        <van-col span="12">
          <van-button @click="_cancel">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_cropper" type="primary">截图</van-button>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
import axios from 'axios'
import Utils from '@/utils'

export default {
  name: 'singleImgCropper',

  mixins: [],

  components: {
    VueCropper,
  },

  props: {
    title: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    ratio: {
      type: Array,
      default: () => [1, 1],
    },
    count: {
      type: Number,
      default: 1,
    },
    fixedRatio: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      picList: [],
      showPopup: false,
      img: '',
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
        this.img = res
        this.showPopup = true
      })
      return false
    },
    _cropper() {
      this.$refs.cropper.getCropData(data => {
        axios
          .post('/appapi.php?c=Merchantapp&a=base64change', {
            imgBase: data,
            ticket: localStorage.getItem('ticket'),
          })
          .then(res => {
            this.picList.push({ url: res })
            this._cancel()
          })
          .catch(e => {
            console.log(e)
          })
      })
    },
    _cancel() {
      this.showPopup = false
    },
  },
}
</script>

<style lang="less" scoped>
.cell {
  .van-cell__value {
    flex: 1.1;
    padding-top: 10px;
  }
}

.popup {
  height: 100%;

  .van-button {
    width: 100%;
  }

  .cropper {
    height: calc(100% - 44px);
  }
}
</style>
