<template>
  <div>
    <van-nav-bar @click-left="$goBack" @click-right="_create" fixed left-arrow right-text="创建" title="店铺优惠"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <div :key="index" v-for="(item, index) in list">
      <van-panel
        :desc="item.type === '0' ? '新单' : '满减'"
        :status="item.status === '1' ? '启用' : '停用'"
        :title="`满${item.full_money}减${item.reduce_money}`"
      >
        <div slot="footer">
          <van-button @click="_controlEditor(item)" size="mini" type="primary">编辑</van-button>
        </div>
      </van-panel>
      <div class="white-space"></div>
    </div>
    <!-- 弹出层 -->
    <!-- 优惠编辑 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEditor">
      <ValidationObserver ref="observer" slim v-slot="{ invalid }">
        <van-cell-group>
          <ValidationProvider name="优惠条件" rules="required|decimal-max2" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="优惠条件"
              placeholder="请输入满足金额"
              required
              type="number"
              v-model="formData.full_money"
            />
          </ValidationProvider>
          <ValidationProvider name="优惠金额" rules="required|decimal-max2" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="优惠金额"
              placeholder="请输入优惠金额"
              required
              type="number"
              v-model="formData.reduce_money"
            />
          </ValidationProvider>
          <van-field :value="typeLabel" @click="_controlTypePicker" input-align="right" is-link label="优惠类型" readonly />
          <van-field
            :value="statusLabel"
            @click="_controlStatusPicker"
            input-align="right"
            is-link
            label="使用状态"
            readonly
          />
        </van-cell-group>
      </ValidationObserver>
      <div class="btn-group">
        <van-button @click="_controlEditor()">关闭</van-button>
        <van-button @click="_submit" type="primary">保存</van-button>
      </div>
    </van-popup>
    <!-- 优惠类型选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showTypePicker">
      <van-picker
        :columns="typeColumns"
        :default-index="typeIndex"
        @cancel="_controlTypePicker"
        @confirm="_pickType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 优惠状态选择 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStatusPicker">
      <van-picker
        :columns="statusColumns"
        :default-index="statusIndex"
        @cancel="_controlStatusPicker"
        @confirm="_pickStatus"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'eCommerceSettingPreferential',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        full_money: '',
        reduce_money: '',
        type: '0',
        status: '1',
      },
      list: [],
      showEditor: false,
      showTypePicker: false,
      showStatusPicker: false,
      loading: false,
      typeColumns: [{ label: '新单', value: '0' }, { label: '满减', value: '1' }],
      statusColumns: [{ label: '停用', value: '0' }, { label: '启用', value: '1' }],
      lastId: '',
    }
  },

  computed: {
    typeLabel() {
      const item = this.typeColumns.find(item => item.value === this.formData.type)
      return item && item.label
    },
    typeIndex() {
      const index = this.typeColumns.findIndex(item => item.value === this.formData.type)
      return index
    },
    statusLabel() {
      const item = this.statusColumns.find(item => item.value === this.formData.status)
      return item && item.label
    },
    statusIndex() {
      const index = this.statusColumns.findIndex(item => item.value === this.formData.status)
      return index
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    id && this._getStoreFrontPreferentialList(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('storeFront', [
      'getStoreFrontPreferentialList',
      'createStoreFrontPreferential',
      'updateStoreFrontPreferential',
    ]),
    _controlEditor(item) {
      if (item) {
        this.formData.full_money = item.full_money
        this.formData.reduce_money = item.reduce_money
        this.formData.type = item.type
        this.formData.status = item.status
        this.lastId = item.id
      }
      this.showEditor = !this.showEditor
      this.$nextTick(() => {
        this.$refs.observer.reset()
      })
    },
    _controlTypePicker() {
      this.showTypePicker = !this.showTypePicker
    },
    _controlStatusPicker() {
      this.showStatusPicker = !this.showStatusPicker
    },
    _pickType(data) {
      this.formData.type = data.value
      this._controlTypePicker()
    },
    _pickStatus(data) {
      this.formData.status = data.value
      this._controlStatusPicker()
    },
    _getStoreFrontPreferentialList(id) {
      this.getStoreFrontPreferentialList(id).then(res => {
        this.list = res
      })
    },
    _create() {
      this.formData = {
        full_money: '',
        reduce_money: '',
        type: '0',
        status: '1',
      }
      this.lastId = ''
      this._controlEditor()
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
        // 表单完整，进行数据修改并提交
        const params = JSON.parse(JSON.stringify(this.formData))
        let method = 'createStoreFrontPreferential'
        const { id } = this.$route.params
        if (this.lastId) {
          method = 'updateStoreFrontPreferential'
          params.id = this.lastId
        }
        params.store_id = id
        this[method](params)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this._getStoreFrontPreferentialList(id)
                this._controlEditor()
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
.btn-group {
  .van-button {
    width: 50%;
    margin: 0;
  }
}
.van-panel__footer {
  text-align: right;
}
</style>
