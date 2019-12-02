<template>
  <div>
    <van-nav-bar :title="`${type}自提点`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <van-cell-group>
      <ValidationObserver ref="observer" slim v-slot="{ invalid }">
        <ValidationProvider name="自提点经纬度" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="coordinateLabel"
            @click="_controlCoordinatePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="地图位置"
            placeholder="选择地图坐标"
            readonly
            required
          ></van-field>
        </ValidationProvider>
        <area-picker :data="defaultArea" :pickArea="_pickArea" field="店铺所在地" title="店铺所在地"></area-picker>
        <ValidationProvider name="详细地址" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="详细地址"
            maxlength="100"
            placeholder="店铺详细地址"
            required
            rows="2"
            show-word-limit
            type="textarea"
            v-model.trim="formData.pick_addr"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="电话号码" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="电话号码"
            placeholder="请输入电话号码"
            required
            type="mobile"
            v-model.trim="formData.phone"
          />
        </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <!-- 坐标选择 -->
    <coordinate-picker :cancel="_controlCoordinatePicker" :confirm="_pickCoordinate" :show="showCoordinatePicker"></coordinate-picker>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import AreaPicker from '@/components/AreaPicker'
import CoordinatePicker from '@/components/CoordinatePicker'
export default {
  name: 'selfMentionPointCRU',

  mixins: [],

  components: {
    AreaPicker,
    CoordinatePicker,
  },

  props: {},

  data() {
    return {
      formData: {
        lat: '',
        long: '',
        province_id: '',
        city_id: '',
        area_id: '',
        pick_addr: '',
        phone: '',
        id: 0,
      },
      defaultArea: null,
      showCoordinatePicker: false,
    }
  },

  computed: {
    // 经纬度非空验证
    coordinateLabel() {
      if (!this.formData.long || !this.formData.lat) return ''
      return this.formData.long + ', ' + this.formData.lat
    },
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
  },

  watch: {},

  created() {},

  mounted() {
    const { id } = this.$route.params
    if (id) {
      this._readSelfMentionPointDetail(id)
    }
  },

  destroyed() {},

  methods: {
    ...mapActions('selfMentionPoint', [
      'readSelfMentionPointDetail',
      'createSelfMentionPoint',
      'updateSelfMentionPoint',
    ]),
    // 地区选择
    _pickArea(data) {
      this.formData.province_id = data[0].value
      this.formData.city_id = data[1].value
      this.formData.area_id = data[2].value
    },
    // 坐标选择
    _pickCoordinate(lng, lat) {
      this.formData.long = lng
      this.formData.lat = lat
      this._controlCoordinatePicker()
    },
    // 坐标拾取
    _controlCoordinatePicker() {
      this.showCoordinatePicker = !this.showCoordinatePicker
    },
    async _submit() {
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
        let method = 'createSelfMentionPoint'
        const { id } = this.$route.params
        if (id) {
          method = 'updateSelfMentionPoint'
        }
        this.formData.long_lat = [this.formData.long, this.formData.lat]
        this[method](this.formData)
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
    // 获取详情数据
    _readSelfMentionPointDetail(id) {
      this.readSelfMentionPointDetail(id).then(res => {
        this.formData.lat = res.lat
        this.formData.long = res.long
        this.formData.province_id = res.province_id
        this.formData.city_id = res.city_id
        this.formData.area_id = res.area_id
        this.formData.pick_addr = res.pick_addr
        this.formData.phone = res.phone
        this.formData.id = res.id
        this.defaultArea = [res.province_id, res.city_id, res.area_id]
      })
    },
  },
}
</script>

<style lang="less" scoped>
.con-button {
  width: 90vw;
  margin: 10vh 5vw;
}
</style>
