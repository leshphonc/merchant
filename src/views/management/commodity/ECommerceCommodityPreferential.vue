<template>
  <div>
    <van-nav-bar @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存" title="电商商品优惠"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group title="基础设置">
        <ValidationProvider name="限时价" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="限时价" placeholder="0表示无限时价" v-model="formData.seckill_price"></van-field>
        </ValidationProvider>
        <ValidationProvider name="限时价库存" rules="required|numeric" slim v-slot="{ errors }">
          <van-field :error-message="errors[0]" label="限时价库存" placeholder="-1表示不限量" v-model="formData.seckill_stock"></van-field>
        </ValidationProvider>
        <ValidationProvider name="限时价类型" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="timeTypeLabel"
            @click="_controlTimeTypePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="限时价类型"
            placeholder="请选择"
            readonly
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="开始时间" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="startTimeLabel"
            @click="_controlStartTimePicker"
            error-message-align="right"
            input-align="right"
            is-link
            label="开始时间"
            placeholder="请选择"
            readonly
          ></van-field>
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
            placeholder="请选择"
            readonly
          ></van-field>
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="用户消费赠送比例">
        <ValidationProvider name="赠送元宝数量" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            label="每消费1元赠送"
            placeholder="赠送元宝数量"
            v-model="formData.dhb_get_num"
          >
            <div slot="right-icon">元宝</div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider name="赠送金币数量" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            label="每消费1元赠送"
            placeholder="赠送金币数量"
            v-model="formData.score_get_num"
          >
            <div slot="right-icon">金币</div>
          </van-field>
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="赠送商家优惠券">
        <van-button @click="_addCoupon" icon="plus">新增</van-button>
        <div :key="index" class="van-hairline--bottom" v-for="(item, index) in formData.give">
          <ValidationProvider name="优惠券" rules="required" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              :value="_couponLabel(index)"
              @click="_controlCouponPicker(index)"
              @click-left-icon.stop="_deleteCoupon(item, index)"
              error-message-align="right"
              input-align="right"
              is-link
              label="优惠券"
              left-icon="delete"
              placeholder="请选择"
              readonly
            ></van-field>
          </ValidationProvider>
          <ValidationProvider name="赠送优惠券数量" rules="required|numeric" slim v-slot="{ errors }">
            <van-field :error-message="errors[0]" label="数量" placeholder="赠送优惠券数量" v-model="item.goods_num"></van-field>
          </ValidationProvider>
        </div>
      </van-cell-group>
      <van-cell-group title="活动适用">
        <ValidationProvider name="会员分组" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :value="memberGroupLabel"
            @click="_controlMemberGroupPicker"
            input-align="right"
            is-link
            label="会员分组"
            placeholder="请选择"
            readonly
          ></van-field>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <div class="white-space"></div>
    <!-- 弹出层 -->
    <van-popup position="bottom" v-model="showTimeTypePicker">
      <van-picker
        :columns="timeTypeColumns"
        @cancel="_controlTimeTypePicker"
        @confirm="_pickTimeType"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <van-popup position="bottom" v-model="showStartTimePicker">
      <van-datetime-picker
        :type="timePickerDateType"
        :value="formData.seckill_open_time"
        @cancel="_controlStartTimePicker"
        @confirm="_pickStartTime"
        show-toolbar
      />
    </van-popup>
    <van-popup position="bottom" v-model="showEndTimePicker">
      <van-datetime-picker
        :type="timePickerDateType"
        :value="formData.seckill_close_time"
        @cancel="_controlEndTimePicker"
        @confirm="_pickEndTime"
        show-toolbar
      />
    </van-popup>
    <van-popup position="bottom" v-model="showCouponPicker">
      <van-picker
        :columns="couponColumns"
        @cancel="_controlCouponPicker"
        @confirm="_pickCoupon"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
    <van-popup position="bottom" v-model="showMemberGroupPicker">
      <van-picker
        :columns="memberGroupColumns"
        @cancel="_controlMemberGroupPicker"
        @confirm="_pickMemberGroup"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'eCommerceCommodityPreferential',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        seckill_price: '',
        seckill_stock: '',
        seckill_type: '',
        seckill_open_time: '',
        seckill_close_time: '',
        dhb_get_num: '',
        score_get_num: '',
        give: [],
        in_group: '',
      },
      showTimeTypePicker: false,
      showStartTimePicker: false,
      showEndTimePicker: false,
      showCouponPicker: false,
      showMemberGroupPicker: false,
      loading: false,
      curCoupon: '',
      selectedCoupon: [],
      timeTypeColumns: [
        {
          label: '固定时间段',
          value: '0',
        },
        {
          label: '每天时间段',
          value: '1',
        },
      ],
      couponColumns: [],
      memberGroupColumns: [],
    }
  },

  computed: {
    typeLabel() {
      return ''
    },
    // 自适应120宽度
    resizeWidth() {
      return (120 / 375) * document.body.clientWidth + 'px'
    },
    // 限时价类型非空验证
    timeTypeLabel() {
      const item = this.timeTypeColumns.find(item => item.value === this.formData.seckill_type)
      return item && item.label
    },
    // 开始时间非空验证
    startTimeLabel() {
      if (this.formData.seckill_open_time === '0') {
        return ''
      }
      if (this.timePickerDateType === 'datetime') {
        return (
          this.formData.seckill_open_time && this.$moment(this.formData.seckill_open_time).format('YYYY-MM-DD HH:mm')
        )
      } else {
        return this.formData.seckill_open_time
      }
    },
    // 结束时间非空验证
    endTimeLabel() {
      if (this.formData.seckill_close_time === '0') {
        return ''
      }
      if (this.timePickerDateType === 'datetime') {
        return (
          this.formData.seckill_close_time && this.$moment(this.formData.seckill_close_time).format('YYYY-MM-DD HH:mm')
        )
      } else {
        return this.formData.seckill_close_time
      }
    },
    // 会员分组非空验证
    memberGroupLabel() {
      const item = this.memberGroupColumns.find(item => item.value === this.formData.in_group)
      return item && item.label
    },
    // 目前时间类型
    timePickerDateType() {
      let timeType = 'datetime'
      if (this.formData.seckill_type === '0') {
        timeType = 'datetime'
      }
      if (this.formData.seckill_type === '1') {
        timeType = 'time'
      }
      return timeType
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 优惠券列表
    this._getCouponList()
    // 会员卡分组
    this._getMemberGroupList()
    // 优惠详情
    const id = this.$route.params.id
    id && this._readECommerceCommodityDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions(['getCouponList']),
    ...mapActions('commodity', ['updateECommerceCommodityPreferential', 'readECommerceCommodityDetail']),
    ...mapActions('member', ['getMemberGroupList']),
    // 时间类型开关
    _controlTimeTypePicker() {
      this.showTimeTypePicker = !this.showTimeTypePicker
    },
    // 开始时间开关
    _controlStartTimePicker() {
      this.showStartTimePicker = !this.showStartTimePicker
    },
    // 结束时间开关
    _controlEndTimePicker() {
      this.showEndTimePicker = !this.showEndTimePicker
    },
    // 优惠券开关
    _controlCouponPicker(index) {
      this.curCoupon = index
      this.showCouponPicker = !this.showCouponPicker
    },
    // 会员卡分组开关
    _controlMemberGroupPicker() {
      this.showMemberGroupPicker = !this.showMemberGroupPicker
    },
    // 选择时间类型
    _pickTimeType(data) {
      console.log(data)
      this.formData.seckill_type = data.value
      this.formData.seckill_open_time = ''
      this.formData.seckill_close_time = ''
      this._controlTimeTypePicker()
    },
    // 选择开始时间
    _pickStartTime(data) {
      this.formData.seckill_open_time = data
      this._controlStartTimePicker()
    },
    // 选择结束时间
    _pickEndTime(data) {
      this.formData.seckill_close_time = data
      this._controlEndTimePicker()
    },
    // 选择优惠券
    _pickCoupon(data) {
      // 将选择的优惠券加入已选择的列表中
      this.selectedCoupon = [...new Set([...this.selectedCoupon, data.value])]
      // 判断此次选择的picker是否有值
      const pre = this.formData.give[this.curCoupon].goods
      // 如果有值，找出index并从已选择列表中删除
      const preIndex = this.selectedCoupon.indexOf(pre)
      if (preIndex > -1) {
        this.selectedCoupon.splice(preIndex, 1)
      }
      // 循环优惠券列表，将已选择的优惠券置为灰色，未选择的置为可选
      const arr = this.couponColumns.map(item => {
        if (this.selectedCoupon.indexOf(item.value) > -1) {
          return { ...item, disabled: true }
        } else {
          return { ...item, disabled: false }
        }
      })
      // 刷新优惠券列表
      this.couponColumns = [...arr]
      // 将数据存入formData
      this.formData.give[this.curCoupon].goods = data.value
      this._controlCouponPicker()
    },
    // 选择会员分组
    _pickMemberGroup(data) {
      this.formData.in_group = data.value
      this._controlMemberGroupPicker()
    },
    // 添加优惠券
    _addCoupon() {
      this.formData.give.push({
        goods: '',
        goods_num: '',
      })
    },
    // 移除优惠券
    _deleteCoupon(item, index) {
      console.log(item)
      const selIndex = this.selectedCoupon.indexOf(item.goods)
      console.log(selIndex)
      if (selIndex > -1) {
        this.selectedCoupon.splice(selIndex, 1)
        // 循环优惠券列表，将已选择的优惠券置为灰色，未选择的置为可选
        const arr = this.couponColumns.map(item => {
          if (this.selectedCoupon.indexOf(item.value) > -1) {
            return { ...item, disabled: true }
          } else {
            return { ...item, disabled: false }
          }
        })
        // 刷新优惠券列表
        this.couponColumns = [...arr]
      }
      this.formData.give.splice(index, 1)
    },
    // 获取优惠券列表
    _getCouponList() {
      this.getCouponList().then(res => {
        this.couponColumns = res
      })
    },
    // 获取会员分组
    _getMemberGroupList() {
      this.getMemberGroupList().then(res => {
        this.memberGroupColumns = res
      })
    },
    // 优惠券名称
    _couponLabel(index) {
      const item = this.couponColumns.find(item => item.value === this.formData.give[index].goods)
      return item ? item.label : ''
    },
    // 页面默认数据
    _readECommerceCommodityDetail(id) {
      this.readECommerceCommodityDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
        console.log(res)
        console.log(this.formData)
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
        this.formData.goods_id = this.$route.params.id
        this.formData.store_id = 0
        this.formData.seckill_open_time = this.startTimeLabel
        this.formData.seckill_close_time = this.endTimeLabel
        // 表单完整，进行数据修改并提交
        this.updateECommerceCommodityPreferential(this.formData)
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

<style lang="less" scoped>
.van-button {
  width: 100%;
}
</style>
