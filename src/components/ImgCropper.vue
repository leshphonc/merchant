<!--
  功能：cell点击弹出层裁剪图片
  作者：cc
  时间：2019年10月12日
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
  props：
    title<String>：cell展示的名称
    confirm<Function>：用于接收裁剪结果 格式为[{ url: http://abc.jpg }]
    list<Array>：默认图片
    count<Number>：可截取图片数量
    ratio<Array>：默认截图框宽高比
    fixedRatio<Boolean>：截图框比例可更改
    field<String>：传入字段名，判断是否开始验证
-->
<template>
  <div>
    <ValidationProvider :name="field" :rules="field ? 'required' : null" slim v-slot="{ errors }">
      <van-field
        :error-message="errors[0]"
        :label="title"
        :required="field ? true : false"
        class="upload-field"
        v-model="validate"
      >
        <van-uploader :before-read="_beforeRead" :max-count="count" slot="input" v-model="picList" />
      </van-field>
    </ValidationProvider>
    <van-popup class="upload-popup" position="bottom" safe-area-inset-bottom v-model="showPopup">
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
          <van-button @click="_cancel" native-type="button">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_cropper" native-type="button" type="primary">截图</van-button>
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
    // 名称
    title: {
      type: String,
      required: true,
    },
    // 返回值截取结果
    confirm: {
      type: Function,
      required: true,
    },
    // 默认数据
    list: {
      type: Array,
      default: () => [],
    },
    // 可截取图片数量
    count: {
      type: Number,
      default: 1,
    },
    // 默认截图框宽高比
    ratio: {
      type: Array,
      default: () => [1, 1],
    },
    // 截图框比例可更改
    fixedRatio: {
      type: Boolean,
      default: true,
    },
    // 是否开始验证
    field: {
      type: String,
    },
  },

  data() {
    return {
      picList: [],
      showPopup: false,
      img: '',
    }
  },

  computed: {
    validate() {
      if (this.picList.length) {
        return JSON.stringify(this.picList.length)
      }
      return undefined
    },
  },

  watch: {
    list() {
      this.picList = this.list
    },
  },

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
            this.confirm(this.picList)
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

<style lang="less">
.upload-field {
  .van-cell__value {
    padding-top: 10px;
  }
  .van-uploader__preview-image {
    width: 76px;
    height: 76px;
  }
  .van-uploader__upload {
    width: 76px;
    height: 76px;
  }
  .van-uploader__file {
    width: 76px;
    height: 76px;
  }
}

.upload-popup {
  height: 100%;

  .van-button {
    width: 100%;
  }

  .cropper {
    height: calc(100% - 44px);
  }
}
</style>
