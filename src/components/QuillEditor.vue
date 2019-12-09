<!--
  功能：编辑器带自定义截图上传功能
  作者：cc
  时间：2019年10月31日
  版本：v1.0
  修改记录：
  修改内容：
  修改人员：
  修改时间：
  props：
    context<String>：需要渲染的富文本
    changeHtml<Function>：向父组件返回html
  
  使用方法：推荐将此组件ref设为editor，需要在渲染数据时调用下面方法用于取消focus状态，并且滚动到顶部
  this.$nextTick(function() {
    this.$refs.editor.$refs.quillEditor.quill.blur()
    window.scroll(0, 0)
  })

  在form表单提交时需要手动校验this.$refs.editor.editorHtml是否为空
-->
<template>
  <div>
    <quill-editor @change="changeHtml" ref="quillEditor" v-model.trim="editorHtml"></quill-editor>
    <van-popup class="upload-popup" position="bottom" safe-area-inset-bottom v-model="showPopup">
      <vue-cropper :img="img" :outputSize="0.3" autoCrop centerBox class="cropper" ref="cropper"></vue-cropper>
      <van-row>
        <van-col span="12">
          <van-button @click="_cancel" native-type="button">取消</van-button>
        </van-col>
        <van-col span="12">
          <van-button @click="_cropper" native-type="button" type="primary">截图</van-button>
        </van-col>
      </van-row>
    </van-popup>
    <input
      @change="_changeImg"
      accept="image/jpg, image/jpeg, image/png"
      ref="file"
      style="display: none;"
      type="file"
    />
  </div>
</template>

<script>
import Quill from 'quill'
import { VueCropper } from 'vue-cropper'
import Utils from '@/utils'

export default {
  name: '',

  mixins: [],

  components: {
    VueCropper,
  },

  props: {
    context: String,
    changeHtml: {
      type: Function,
      required: true,
    },
  },

  data() {
    return {
      showPopup: false,
      img: '',
      editorHtml: '',
    }
  },

  computed: {},

  watch: {
    context() {
      this.editorHtml = this.context
    },
  },

  created() {},

  mounted() {
    this.$refs.quillEditor.quill.getModule('toolbar').addHandler('image', this._uploadImg)
  },

  destroyed() {},

  methods: {
    // 上传富文本图片
    _uploadImg(state) {
      if (state) {
        this.$refs.file.click()
        //button is clicked
      }
    },
    // 图片改变
    _changeImg(e) {
      const file = e.currentTarget.files[0]
      Utils.fileConversionToBase64(file).then(res => {
        this.img = res
        this.showPopup = true
      })
    },
    // 图片裁剪
    _cropper() {
      this.$refs.cropper.getCropData(data => {
        this.$axios
          .post('/appapi.php?c=Merchantapp&a=base64change', {
            imgBase: data,
            ticket: localStorage.getItem('ticket'),
          })
          .then(res => {
            this.addImgRange = this.$refs.quillEditor.quill.getSelection()
            this.$refs.quillEditor.quill.insertEmbed(
              this.addImgRange != null ? this.addImgRange.index : 0,
              'image',
              res,
              Quill.sources.USER
            )
            this._cancel()
          })
          .catch(() => {})
      })
    },
    _cancel() {
      this.showPopup = false
    },
  },
}
</script>

<style lang="less" scoped>
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
