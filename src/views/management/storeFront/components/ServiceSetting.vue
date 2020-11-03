<template>
  <div>
    <van-nav-bar @click-left="$goBack" fixed left-arrow title="服务配置"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group title="买单标识">
      <van-field
        :value="flagLabel"
        @click="_controlFlagPicker"
        input-align="right"
        is-link
        label="买单标识"
        placeholder="请选择"
        readonly
      />
      <van-cell @click="_controlFlagPopup" is-link title="配置标识位" v-if="flag === 1"></van-cell>
    </van-cell-group>
    <!-- 弹出层 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showFlagPicker">
      <van-picker
        :columns="flagColumns"
        :default-index="flagIndex"
        @cancel="_controlFlagPicker"
        @confirm="_pickFlag"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTagPicker">
      <van-picker
        :columns="tagColumns"
        :default-index="tagIndex"
        @cancel="_controlTagPicker"
        @confirm="_pickTag"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <van-popup position="bottom" safe-area-inset-bottom v-model="showDevicePicker">
      <van-picker
        :columns="deviceColumns"
        :default-index="deviceIndex"
        @cancel="_controlDevicePicker"
        @confirm="_pickDevice"
        show-toolbar
        value-key="imax_name"
      ></van-picker>
    </van-popup>
    <van-popup class="popup" position="bottom" safe-area-inset-bottom v-model="showFlagPopup">
      <div :key="index" v-for="(item, index) in list">
        <van-cell :title="item.s_name" center>
          <van-button @click="_preView(item.id)" size="small">生成二维码</van-button>
          <van-button @click="_controlFlagEditor(item)" size="small" type="primary">编辑</van-button>
        </van-cell>
      </div>
      <div class="btn-group">
        <van-button @click="_controlFlagPopup" class="close-btn">关闭</van-button>
        <van-button @click="_controlFlagEditor()" class="create-btn" type="primary">创建</van-button>
      </div>
    </van-popup>
    <van-popup class="popup" position="bottom" safe-area-inset-bottom v-model="showFlagEditor">
      <van-form @submit="_submit">
        <van-field
          :rules="[{ required: true, message: '标识名称是必须的' }]"
          label="标识名称"
          name="name"
          placeholder="请填写标识名称"
          v-model="formData.name"
        />
        <van-field
          v-if="formData.tag == '2'"
          :rules="[{ required: true, message: '最少容纳人数是必须的' }]"
          label="最少容纳人数"
          name="low_person_num"
          placeholder="请填写最少容纳人数"
          type="digit"
          v-model="formData.low_person_num"
        />
        <van-field
          v-if="formData.tag == '2'"
          :rules="[{ required: true, message: '最多容纳人数是必须的' }]"
          label="最多容纳人数"
          name="person_num"
          placeholder="请填写最多容纳人数"
          type="digit"
          v-model="formData.person_num"
        />
        <van-field
          :rules="[{ required: true, message: '内部地址是必须的' }]"
          label="内部地址"
          name="detailed_address"
          placeholder="请填写内部地址"
          v-model="formData.detailed_address"
        />
        <van-field
          :rules="[{ required: true, message: '标识类型' }]"
          :value="tagLabel"
          @click="_controlTagPicker"
          input-align="right"
          is-link
          label="标识类型"
          name="tag"
          placeholder="请选择"
          readonly
        />
        <van-field
          :rules="[{ required: false, message: '绑定屏幕' }]"
          :value="deviceLabel"
          @click="_controlDevicePicker"
          input-align="right"
          is-link
          label="绑定屏幕"
          name="device_id"
          placeholder="请选择（非必选）"
          readonly
        />
        <img-cropper :confirm="_pickPic" :count="5" :list="pic" name="env_img" title="环境图片"></img-cropper>
        <div class="btn-group">
          <van-button @click="_controlFlagEditor()" class="close-btn" native-type="button">关闭</van-button>
          <van-button class="create-btn" native-type="submit" type="primary">确认</van-button>
        </div>
      </van-form>
    </van-popup>
    <!-- <van-dialog :before-close="_submit" show-cancel-button title="标识位" v-model="showFlagEditor">
      <van-field input-align="center" placeholder="请输入标识位名称" v-model="name"></van-field>
    </van-dialog>-->
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ImagePreview } from 'vant'
import ImgCropper from '@/components/ImgCropper'
export default {
  name: 'serviceSetting',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      showFlagPicker: false,
      showFlagPopup: false,
      showFlagEditor: false,
      showTagPicker: false,
      showDevicePicker: false,
      flagColumns: [
        {
          label: '自定义买单标识',
          value: 1,
        },
        {
          label: '车牌买单标识',
          value: 2,
        },
      ],
      tagColumns: [
        {
          label: '个人标识',
          value: '1',
        },
        {
          label: '多人标识',
          value: '2',
        },
        {
          label: '公共标识',
          value: '3',
        },
      ],
      deviceColumns: [],
      flag: 1,
      tag: '1',
      device: '0',
      device_name: '',
      loading: false,
      list: [],
      lastId: '',
      formData: {
        name: '',
        low_person_num: '',
        person_num: '',
        env_img: [],
        detailed_address: '',
        tag: '1',
        device_id: '0',
      },
      pic: [],
    }
  },

  computed: {
    flagLabel() {
      const item = this.flagColumns.find(item => item.value === this.flag)
      return item && item.label
    },
    flagIndex() {
      const index = this.flagColumns.findIndex(item => item.value === this.flag)
      return index
    },
    tagLabel() {
      const item = this.tagColumns.find(item => item.value === this.tag)
      return item && item.label
    },
    tagIndex() {
      const index = this.tagColumns.findIndex(item => item.value === this.tag)
      return index
    },
    deviceLabel() {
      const item = this.deviceColumns.find(item => item.id === this.device)
      return (item && item.imax_name) || this.device_name
    },
    deviceIndex() {
      const index = this.deviceColumns.findIndex(item => item.id === this.device)
      return index
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._getStoreFrontFlagList(id)
    id && this._getStoreFrontCurrentFlag(id)
  },

  destroyed() {},

  beforeRouteLeave(to, from, next) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (
      this.showFlagPicker ||
      this.showFlagPopup ||
      this.showFlagEditor ||
      this.showTagPicker ||
      this.showDevicePicker
    ) {
      this.showFlagPicker = false
      this.showFlagPopup = false
      this.showFlagEditor = false
      this.showTagPicker = false
      this.showDevicePicker = false
      next(false)
    } else {
      next()
    }
  },

  methods: {
    ...mapActions('storeFront', [
      'getStoreFrontFlagList',
      'createStoreFrontFlag',
      'updateStoreFrontFlag',
      'changeStoreFlagStatus',
      'getStoreFrontCurrentFlag',
    ]),
    _controlFlagPicker() {
      this.showFlagPicker = !this.showFlagPicker
    },
    _controlFlagPopup() {
      this.showFlagPopup = !this.showFlagPopup
    },
    _controlTagPicker() {
      this.showTagPicker = !this.showTagPicker
    },
    _controlDevicePicker() {
      this.showDevicePicker = !this.showDevicePicker
    },
    _controlFlagEditor(data) {
      if (data) {
        this.lastId = data.id
        this.formData = {
          name: data.s_name,
          low_person_num: data.low_person_num,
          person_num: data.person_num,
          env_img: data.env_img,
          detailed_address: data.detailed_address,
          tag: data.tag,
          device_id: data.device_id,
        }
        this.pic = data.env_img.map(item => {
          return {
            url: item,
          }
        })
        this.tag = data.tag
        this.device = data.device_id
        this.device_name = data.imax_name
      } else {
        this.lastId = ''
        this.tag = '1'
        this.device = '0'
        this.device_name = ''
        this.formData = {
          name: '',
          low_person_num: '',
          person_num: '',
          env_img: [],
          detailed_address: '',
          tag: '1',
          device_id: '0',
        }
        this.pic = []
      }
      this.showFlagEditor = !this.showFlagEditor
    },
    _pickFlag(data) {
      const { id } = this.$route.params
      this.changeStoreFlagStatus({
        store_id: id,
        type: data.value,
      }).then(() => {
        this._getStoreFrontCurrentFlag(id)
        this._controlFlagPicker()
      })
    },
    _pickTag(data) {
      this.formData.tag = data.value
      this.tag = data.value
      this._controlTagPicker()
    },
    _pickDevice(data) {
      this.formData.device_id = data.id
      this.device = data.id
      this._controlDevicePicker()
    },
    _getStoreFrontFlagList(id) {
      this.getStoreFrontFlagList({ store_id: id }).then(res => {
        this.list = res.station_list
        this.deviceColumns = [
          {
            id: '0',
            imax_name: '无',
          },
          ...res.device_list,
        ]
      })
    },
    _getStoreFrontCurrentFlag(id) {
      this.getStoreFrontCurrentFlag(id).then(res => {
        if (res.defined === 1) {
          this.flag = 1
        } else if (res.car === 1) {
          this.flag = 2
        }
      })
    },
    _submit(values) {
      if (this.loading) return
      this.loading = true
      const { id } = this.$route.params
      let params = {
        type: '1',
        store_id: id,
        ...values,
        env_img: values.env_img.map(item => item.url),
      }
      params.tag = this.formData.tag
      params.device_id = this.formData.device_id
      let methods = 'createStoreFrontFlag'
      if (this.lastId) {
        methods = 'updateStoreFrontFlag'
        params.id = this.lastId
      }
      this[methods](params)
        .then(() => {
          this.$toast.success({
            message: '操作成功',
            duration: 1000,
            onClose: () => {
              this._getStoreFrontFlagList(id)
              this._controlFlagEditor()
              this.loading = false
            },
          })
        })
        .catch(() => {
          this._controlFlagEditor()
          this.loading = false
        })
    },
    _preView(sid) {
      const { id } = this.$route.params
      const url = `/appapi.php?g=Appapi&c=Imax2&a=geth5Qrcode&url=${encodeURIComponent(
        window.location.origin + '/neworder/cart/' + sid
      )}`
      ImagePreview({
        images: [url],
        showIndex: false,
        closeOnPopstate: true,
        maxZoom: 1,
      })
    },
    _pickPic(data) {
      // console.log(data)
    },
  },
}
</script>

<style lang="less" scoped>
.popup {
  height: 80vh;
  padding-bottom: 44px;
  box-sizing: border-box;

  .btn-group {
    position: fixed;
    bottom: 0;
    width: 100%;
    .van-button {
      width: 50%;
      margin: 0;
    }
  }
}

.full {
  height: 100vh;
}
</style>
