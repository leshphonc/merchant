<template>
  <div>
    <van-nav-bar :title="`${type}店员`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="店员姓名" rules="required" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="姓名" placeholder="店员姓名" required v-model.trim="formData.name"></van-field>
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
          <van-field :error-message="errors[0]" label="手机号" placeholder="店员手机号" required v-model.trim="formData.tel"></van-field>
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
        value-key="label"
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'staffCRU',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        name: '',
        type: '',
        username: '',
        password: '',
        tel: '',
        store_id: '',
      },
      loading: false,
      showStaffTypePicker: false,
      showStorePicker: false,
      staffTypeColumns: [],
      storeColumns: [],
    }
  },

  computed: {
    // 页面类型
    type() {
      const { id } = this.$route.params
      return id ? '编辑' : '创建'
    },
    staffTypeLabel() {
      const item = this.staffTypeColumns.find(item => item.value === this.formData.type)
      return item && item.label
    },
    staffTypeIndex() {
      const index = this.staffTypeColumns.findIndex(item => item.value === this.formData.type)
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
    ...mapActions('staff', ['getStaffType', 'createStaff', 'updateStaff', 'readStaffDetail']),
    // 店员类型开关
    _controlStaffTypePicker() {
      this.showStaffTypePicker = !this.showStaffTypePicker
    },
    // 店铺选择开关
    _controlStorePicker() {
      this.showStorePicker = !this.showStorePicker
    },
    // 店员类型选择
    _pickStaffType(data) {
      this.formData.type = data.value
      this._controlStaffTypePicker()
    },
    // 店铺选择
    _pickStore(data) {
      this.formData.store_id = data.value
      this._controlStorePicker()
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
      this.readStaffDetail({
        store_id: sid,
        staff_id: id,
      }).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        this.formData.password = ''
      })
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
