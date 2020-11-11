<template>
  <div>
    <van-nav-bar
      :title="`${type}店员`"
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="店员姓名" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="姓名"
            placeholder="店员姓名"
            required
            v-model.trim="formData.name"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="店员类型" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="staffTypeLabel"
            @click="_controlStaffTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="店员类型"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="账号" rules="required" slim v-slot="{ errors }">
          <van-field
            :disabled="type === '编辑'"
            :error-message="errors[0]"
            :readonly="type === '编辑'"
            label="账号"
            placeholder="店员登录账号"
            required
            v-model.trim="formData.username"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider :rules="type === '编辑' ? '' : 'required'" name="密码" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :required="type !== '编辑'"
            label="密码"
            placeholder="店员登录密码"
            v-model.trim="formData.password"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="手机号" rules="required|phone" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="手机号"
            placeholder="店员手机号"
            required
            v-model.trim="formData.tel"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="分佣比例" rules="required|numeric|min_value:0|max_value:100" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="分佣比例"
            placeholder="0-100之间整数，0表示不分佣"
            required
            type="number"
            v-model.trim="formData.spread_rato"
          >
            <div slot="right-icon">%</div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="所属店铺" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="storeLabel"
            @click="_controlStorePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="所属店铺"
            placeholder="请选择"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <img-cropper
          :confirm="_pickAvatar"
          :delete="_deleteAvatar"
          :list="avatar"
          field="店员头像"
          title="店员头像"
        ></img-cropper>
      </van-cell-group>
      <van-cell-group title="技师等级（非必选）">
        <ValidationProvider name="技师等级" slim v-slot="{ errors }">
          <van-field
            :value="staffLevelLabel"
            @click="_controlStaffLevelPicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="技师等级"
            placeholder="请选择"
            readonly
          ></van-field>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 店员类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStaffTypePicker">
      <van-picker
        :columns="staffTypeColumns"
        :default-index="staffTypeIndex"
        @cancel="_controlStaffTypePicker"
        @confirm="_pickStaffType"
        show-toolbar
        value-key="name"
      ></van-picker>
    </van-popup>
    <!-- 店铺列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStorePicker">
      <van-picker
        :columns="storeColumns"
        :default-index="storeIndex"
        @cancel="_controlStorePicker"
        @confirm="_pickStore"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 技师等级列表 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStaffLevelPicker">
      <van-picker
        :columns="staffLevelColumns"
        :default-index="staffLevelIndex"
        @cancel="_controlStaffLevelPicker"
        @confirm="_pickStaffLevel"
        show-toolbar
        value-key="name"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'

export default {
  name: 'staffCRU',

  mixins: [],

  components: {
    ImgCropper,
  },

  props: {},

  data() {
    return {
      formData: {
        name: '',
        type: '',
        username: '',
        password: '',
        tel: '',
        spread_rato: '',
        store_id: '',
        technician_grade_id: '0',
        avatar: '',
      },
      loading: false,
      showStaffTypePicker: false,
      showStorePicker: false,
      showStaffLevelPicker: false,
      staffTypeColumns: [],
      storeColumns: [],
      staffLevelColumns: [{ id: '0', name: '无等级' }],
      avatar: [],
    }
  },

  computed: {
    // 页面类型
    type() {
      const { id } = this.$route.params
      return id ? '编辑' : '创建'
    },
    staffTypeLabel() {
      const item = this.staffTypeColumns.find(item => item.id === this.formData.type)
      return item && item.name
    },
    staffTypeIndex() {
      const index = this.staffTypeColumns.findIndex(item => item.id === this.formData.type)
      return index
    },
    storeLabel() {
      const item = this.storeColumns.find(item => item.value === this.formData.store_id)
      return item && item.label
    },
    storeIndex() {
      const index = this.storeColumns.findIndex(item => item.value === this.formData.store_id)
      return index
    },
    staffLevelLabel() {
      const item = this.staffLevelColumns.find(item => item.id === this.formData.technician_grade_id)
      return item && item.name
    },
    staffLevelIndex() {
      const index = this.staffLevelColumns.findIndex(item => item.id === this.formData.technician_grade_id)
      return index
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getStoreList()
    this._getStaffType()
    const { id, sid } = this.$route.params
    id && sid && this._readStaffDetail(id, sid)
  },

  destroyed() {},

  methods: {
    ...mapActions(['getStoreList']),
    ...mapActions('staff', ['getStaffType', 'createStaff', 'updateStaff', 'readStaffDetail', 'getStaffLevelList']),
    // 店员类型开关
    _controlStaffTypePicker() {
      this.showStaffTypePicker = !this.showStaffTypePicker
    },
    // 店铺选择开关
    _controlStorePicker() {
      this.showStorePicker = !this.showStorePicker
    },
    // 技师等级开关
    _controlStaffLevelPicker() {
      this.showStaffLevelPicker = !this.showStaffLevelPicker
    },
    // 店员类型选择
    _pickStaffType(data) {
      this.formData.type = data.id
      this.getStaffLevelList({ post_id: data.id }).then(res => {
        this.staffLevelColumns = [{ id: '0', name: '无等级' }, ...res]
      })
      this._controlStaffTypePicker()
    },
    // 店铺选择
    _pickStore(data) {
      this.formData.store_id = data.value
      this._controlStorePicker()
    },
    // 技师等级选择
    _pickStaffLevel(data) {
      this.formData.technician_grade_id = data.id
      this._controlStaffLevelPicker()
    },
    // 获取店员类型
    _getStaffType() {
      this.getStaffType().then(res => {
        this.staffTypeColumns = res
      })
    },
    // 获取店铺
    _getStoreList() {
      this.getStoreList().then(res => {
        this.storeColumns = res.store_list
      })
    },
    _readStaffDetail(id, sid) {
      const toast = this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
      })
      this.readStaffDetail({
        store_id: sid,
        staff_id: id,
      })
        .then(res => {
          toast.clear()
          this.getStaffLevelList({ post_id: res.type }).then(list => {
            this.staffLevelColumns = [{ id: '0', name: '无等级' }, ...list]
            const keys = Object.keys(this.formData)
            keys.forEach(item => {
              this.formData[item] = res[item]
            })
            if (res.avatar) {
              this.avatar = [{ url: res.avatar }]
            }
            this.formData.password = ''
          })
        })
        .catch(() => {
          toast.clear()
        })
    },
    _pickAvatar(data) {
      this.formData.avatar = data[0].url
    },
    _deleteAvatar(data, index) {
      this.formData.avatar = ''
      this.avatar.splice(index, 1)
    },
    async _submit() {
      // 锁
      if (this.loading) return
      const isValid = await this.$refs.observer.validate()
      if (!isValid) {
        this.$notify({
          type: 'warning',
          message: '请填写完整信息',
        })
      } else {
        this.loading = true
        const { id } = this.$route.params
        let method = 'createStaff'
        const params = JSON.parse(JSON.stringify(this.formData))
        if (id) {
          method = 'updateStaff'
          params.staff_id = id
        }
        this[method](params)
          .then(() => {
            this.$toast.success({
              message: '操作成功',
              forbidClick: true,
              duration: 1500,
              onClose: () => {
                // 解锁
                this.loading = false
                this.$goBack()
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

<style lang="less" scoped></style>
