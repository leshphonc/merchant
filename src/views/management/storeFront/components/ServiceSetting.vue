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
    <van-popup class="popup" position="bottom" safe-area-inset-bottom v-model="showFlagPopup">
      <div :key="index" v-for="(item, index) in list">
        <van-cell :title="item.s_name" center>
          <van-button @click="_preView(item.id)" size="small">生成二维码</van-button>
          <van-button @click="_controlFlagEditor(item)" size="small" type="primary">编辑</van-button>
        </van-cell>
      </div>
      <div class="btn-group">
        <van-button @click="_controlFlagEditor()" class="create-btn" type="primary">创建标识</van-button>
        <van-button @click="_controlFlagPopup" class="close-btn">关闭</van-button>
      </div>
    </van-popup>
    <van-dialog :before-close="_submit" show-cancel-button title="标识位" v-model="showFlagEditor">
      <van-field input-align="center" placeholder="请输入标识位名称" v-model="name"></van-field>
    </van-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { ImagePreview } from 'vant'
export default {
  name: 'serviceSetting',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      showFlagPicker: false,
      showFlagPopup: false,
      showFlagEditor: false,
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
      flag: 1,
      loading: false,
      list: [],
      lastId: '',
      name: '',
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
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._getStoreFrontFlagList(id)
    id && this._getStoreFrontCurrentFlag(id)
  },

  destroyed() {},

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
    _controlFlagEditor(data) {
      if (data) {
        this.lastId = data.id
        this.name = data.s_name
      } else {
        this.lastId = ''
        this.name = ''
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
    _getStoreFrontFlagList(id) {
      this.getStoreFrontFlagList(id).then(res => {
        this.list = res
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
    _submit(action, done) {
      if (this.loading) return
      this.loading = true
      if (action === 'confirm') {
        const { id } = this.$route.params
        let params = {
          type: '1',
          store_id: id,
          name: this.name,
        }
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
              },
            })
            done()
            this.loading = false
          })
          .catch(() => {
            done()
            this.loading = false
          })
      } else {
        done()
        this.loading = false
      }
    },
    _preView(sid) {
      const { id } = this.$route.params
      const url = `/appapi.php?g=Appapi&c=Imax2&a=geth5Qrcode&url=${encodeURIComponent(
        window.location.origin + '/wap.php?g=Wap&c=UserOrder&a=userOrderSheet&store_id=' + id + '&s_id=' + sid
      )}`
      ImagePreview({
        images: [url],
        showIndex: false,
        closeOnPopstate: true,
        maxZoom: 1,
      })
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
</style>
