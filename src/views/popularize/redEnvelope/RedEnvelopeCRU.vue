<template>
  <div>
    <van-nav-bar :title="`${type}红包`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="活动名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="活动名称"
            placeholder="填写活动名称"
            required
            v-model.trim="formData.title"
          />
        </ValidationProvider>
        <img-cropper :confirm="_pickPic" :list="pic" field="活动图片" title="活动图片"></img-cropper>
        <ValidationProvider name="开始时间" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="startTimeLabel"
            @click="_controlStartTimePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="开始时间"
            placeholder="选择开始时间"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="结束时间" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="endTimeLabel"
            @click="_controlEndTimePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="结束时间"
            placeholder="选择结束时间"
            readonly
            required
          />
        </ValidationProvider>
        <ValidationProvider name="活动介绍" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            autosize
            label="活动介绍"
            maxlength="50"
            placeholder="请填写简短描述"
            required
            rows="3"
            show-word-limit
            type="textarea"
            v-model.trim="formData.desc"
          />
        </ValidationProvider>
        <area-picker :data="defaultArea" :pickArea="_pickArea" title="活动地区"></area-picker>
        <ValidationProvider name="分享链接" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="分享链接"
            placeholder="请填写链接地址"
            required
            v-model.trim="formData.share_url"
          />
        </ValidationProvider>
        <ValidationProvider name="领取人数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="领取人数"
            placeholder="请填写人数"
            required
            v-model.trim="formData.people"
          />
        </ValidationProvider>
        <ValidationProvider name="领取次数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="领取次数"
            placeholder="每人可领取次数"
            required
            v-model.trim="formData.get_number"
          />
        </ValidationProvider>
        <ValidationProvider name="每天领取次数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="领取次数"
            placeholder="每人每天可领取次数，0表示无限制"
            required
            v-model.trim="formData.day_number"
          />
        </ValidationProvider>
        <van-field
          :value="envelopeTypeLabel"
          @click="_controlEnvelopeTypePicker"
          input-align="right"
          is-link
          label="红包类型"
          placeholder="请选择"
          readonly
          required
        />
        <template v-if="formData.packet_type === '1'">
          <ValidationProvider name="活动资金" rules="required|numeric" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="活动资金"
              placeholder="红包内总金额"
              required
              v-model.trim="formData.item_sum"
            />
          </ValidationProvider>
          <ValidationProvider name="面额上限" rules="required|decimal-max2" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="面额上限"
              placeholder="单个红包可被抽取的最大值"
              required
              v-model.trim="formData.item_max"
            />
          </ValidationProvider>
          <ValidationProvider name="面额下限" rules="required|decimal-max2" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="面额下限"
              placeholder="单个红包可被抽取的最小值"
              required
              v-model.trim="formData.item_min"
            />
          </ValidationProvider>
        </template>
        <template v-if="formData.packet_type === '2'">
          <ValidationProvider name="红包面额" rules="required|decimal-max2" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="红包面额"
              placeholder="最多支持2位小数"
              required
              v-model.trim="formData.item_unit"
            />
          </ValidationProvider>
          <ValidationProvider name="发放个数" rules="required|numeric" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="发放个数"
              placeholder="可被领取的红包个数"
              required
              v-model.trim="formData.item_num"
            />
          </ValidationProvider>
        </template>
        <van-field
          :value="openLabel"
          @click="_controlOpenPicker"
          input-align="right"
          is-link
          label="开启活动"
          placeholder="请选择"
          readonly
          required
        />
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 开始时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showStartTimePicker">
      <van-datetime-picker
        :value="formData.start_time"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        type="datetime"
      />
    </van-popup>
    <!-- 结束时间 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEndTimePicker">
      <van-datetime-picker
        :value="formData.end_time"
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        type="datetime"
      />
    </van-popup>
    <!-- 红包类型 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showEnvelopeTypePicker">
      <van-picker
        :columns="envelopeTypeColumns"
        :default-index="envelopeTypeIndex"
        @cancel="_controlEnvelopeTypePicker"
        @confirm="_pickEnvelopeType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <!-- 开启活动 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showOpenPicker">
      <van-picker
        :columns="openColumns"
        :default-index="openIndex"
        @cancel="_controlOpenPicker"
        @confirm="_pickOpen"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ImgCropper from '@/components/ImgCropper'
import AreaPicker from '@/components/AreaPicker'

export default {
  name: 'redEnvelopeCRU',

  mixins: [],

  components: {
    ImgCropper,
    AreaPicker,
  },

  props: {},

  data() {
    return {
      formData: {
        title: '',
        pic: '',
        start_time: '',
        end_time: '',
        desc: '',
        province_id: '',
        city_id: '',
        area_id: '',
        share_url: '',
        people: '',
        get_number: '',
        day_number: '',
        packet_type: '2',
        item_sum: '',
        item_max: '',
        item_min: '',
        item_num: '',
        item_unit: '',
        is_open: '1',
      },
      pic: [],
      defaultArea: null,
      showAreaPicker: false,
      showEnvelopeTypePicker: false,
      showOpenPicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      areaColumns: [],
      envelopeTypeColumns: [{ label: '手气红包', value: '1' }, { label: '普通红包', value: '2' }],
      openColumns: [{ label: '开启', value: '1' }, { label: '关闭', value: '0' }],
    }
  },

  computed: {
    // 页面类型
    type() {
      return this.$route.params.id ? '编辑' : '创建'
    },
    // 红包类型非空验证
    envelopeTypeLabel() {
      const item = this.envelopeTypeColumns.find(item => item.value === this.formData.packet_type)
      return item && item.label
    },
    // 红包类型默认数据
    envelopeTypeIndex() {
      const index = this.envelopeTypeColumns.findIndex(item => item.value === this.formData.packet_type)
      return index
    },
    // 是否开启非空验证
    openLabel() {
      const item = this.openColumns.find(item => item.value === this.formData.is_open)
      return item && item.label
    },
    // 是否开启默认数据
    openIndex() {
      const index = this.openColumns.findIndex(item => item.value === this.formData.is_open)
      return index
    },
    // 开始时间非空验证
    startTimeLabel() {
      return this.formData.start_time ? this.$moment(this.formData.start_time).format('YYYY-MM-DD HH:mm') : ''
    },
    // 结束时间非空验证
    endTimeLabel() {
      return this.formData.end_time ? this.$moment(this.formData.end_time).format('YYYY-MM-DD HH:mm') : ''
    },
  },

  watch: {},

  created() {},

  mounted() {
    window.scrollTo(0, 0)
    const { id } = this.$route.params
    id && this._readRedEnvelopeDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('redEnvelope', ['createRedEnvelope', 'updateRedEnvelope', 'readRedEnvelopeDetail']),
    // 地区选择开关
    _controlAreaPicker() {
      this.showAreaPicker = !this.showAreaPicker
    },
    // 红包类型开关
    _controlEnvelopeTypePicker() {
      this.showEnvelopeTypePicker = !this.showEnvelopeTypePicker
    },
    // 开启活动
    _controlOpenPicker() {
      this.showOpenPicker = !this.showOpenPicker
    },
    // 开始时间开关
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    // 结束时间开关
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    // 红包类型选择
    _pickEnvelopeType(data) {
      console.log(data)
      this.formData.packet_type = data.value
      this._controlEnvelopeTypePicker()
    },
    // 活动开启选择
    _pickOpen(data) {
      this.formData.is_open = data.value
      this._controlOpenPicker()
    },
    // 活动图片选择
    _pickPic(data) {
      console.log(data)
      this.formData.pic = data[0].url
    },
    // 开始时间选择
    _pickStartTime(data) {
      this.formData.start_time = data
      this._controlStartTimePicker()
    },
    // 结束时间选择
    _pickEndTime(data) {
      this.formData.end_time = data
      this._controlEndTimePicker()
    },
    // 地区选择
    _pickArea(data) {
      this.formData.province_id = data[0].value
      this.formData.city_id = data[1].value
      this.formData.area_id = data[2].value
      console.log(data)
    },
    // 默认数据读取
    _readRedEnvelopeDetail(id) {
      this.readRedEnvelopeDetail(id).then(res => {
        console.log(res)
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        this.pic = [{ url: res.pic }]
        this.formData.start_time = new Date(res.start_time * 1000)
        this.formData.end_time = new Date(res.end_time * 1000)
        this.defaultArea = {
          province_id: res.province_id,
          city_id: res.city_id,
          area_id: res.area_id,
        }
      })
    },
    async _submit() {
      console.log(this.formData)
      // 锁
      if (this.loading) return false
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
        const { id } = this.$route.params
        const params = JSON.parse(JSON.stringify(this.formData))
        let method = 'createRedEnvelope'
        if (id) {
          params.id = id
          method = 'updateRedEnvelope'
        }
        params.start_time = this.$moment(this.formData.start_time).format('YYYY-MM-DD HH:mm')
        params.end_time = this.$moment(this.formData.end_time).format('YYYY-MM-DD HH:mm')
        if (params.packet_type === '1') {
          params.item_num = ''
          params.item_unit = ''
        } else {
          params.item_sum = ''
          params.item_max = ''
          params.item_min = ''
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
