<template>
  <div>
    <van-nav-bar :title="`${type}会员卡分组`" @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group>
        <ValidationProvider name="分组名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="分组名称"
            placeholder="会员卡分组名称"
            required
            v-model.trim="formData.name"
          />
        </ValidationProvider>
        <ValidationProvider name="折扣率" rules="required|between:0, 10|decimal-max1" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-right-icon="$toast('10代表无折扣，8.5代表85折')"
            label="折扣率"
            placeholder="0 ～ 10 之间的数字，支持小数"
            required
            right-icon="question-o"
            type="number"
            v-model.trim="formData.discount"
          />
        </ValidationProvider>
        <ValidationProvider name="有效天数" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            @click-right-icon="$toast('10代表无折扣，8.5代表85折')"
            label="有效天数"
            placeholder="会员分组的有效天数"
            required
            right-icon="question-o"
            type="number"
            v-model.trim="formData.effdays"
          />
        </ValidationProvider>
        <van-cell @click="_addGive" clickable title="赠送礼品券">
          <van-icon name="add-o" slot="right-icon" style="line-height: inherit;" />
        </van-cell>
        <div :key="index" v-for="(item, index) in formData.give">
          <ValidationProvider name="赠送商品" rules="required" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              :value="_couponLabel(index)"
              @click="_controlCouponPicker(index)"
              @click-left-icon.stop="_deleteCoupon(item, index)"
              error-message-align="right"
              input-align="right"
              is-link
              label="商品"
              left-icon="delete"
              placeholder="请选择"
              readonly
              required
            />
          </ValidationProvider>
          <ValidationProvider name="赠送数量" rules="required|numeric" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              error-message-align="right"
              input-align="right"
              label="数量"
              placeholder="赠送商品的数量"
              required
              type="number"
              v-model.trim="item.goods_num"
            />
          </ValidationProvider>
        </div>
        <van-field label="注释" placeholder="分组注释" v-model.trim="formData.des" />
      </van-cell-group>
    </ValidationObserver>
    <!-- 弹出层 -->
    <van-popup position="bottom" safe-area-inset-bottom v-model="showCouponPicker">
      <van-picker
        :columns="couponColumns"
        :default-index="couponIndex"
        @cancel="_controlCouponPicker"
        @confirm="_pickCoupon"
        show-toolbar
        value-key="label"
      ></van-picker>
    </van-popup>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'memberGroupCRU',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        name: '',
        discount: '',
        effdays: '',
        give: [],
        des: '',
      },
      couponColumns: [],
      showCouponPicker: false,
      curCoupon: '',
      selectedCoupon: [],
    }
  },

  computed: {
    type() {
      const { id } = this.$route.params
      return id ? '编辑' : '创建'
    },
    // 优惠券默认数据
    couponIndex() {
      if (this.curCoupon !== '') {
        const index = this.couponColumns.findIndex(item => item.value === this.formData.give[this.curCoupon].goods)
        return index
      } else {
        return 0
      }
    },
  },

  watch: {},

  created() {},

  mounted() {
    this._getCouponList()
    const { id } = this.$route.params
    id && this._readMemberGroupDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions(['getCouponList']),
    ...mapActions('member', ['createMemberGroup', 'readMemberGroupDetail', 'updateMemberGroup']),
    // 优惠券开关
    _controlCouponPicker(index) {
      if (typeof index === 'number') this.curCoupon = index
      this.showCouponPicker = !this.showCouponPicker
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
    // 添加一条赠送记录
    _addGive() {
      this.formData.give.push({
        goods: '',
        goods_num: '',
      })
    },
    // 移除优惠券
    _deleteCoupon(item, index) {
      const selIndex = this.selectedCoupon.indexOf(item.goods)
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
    // 优惠券名称
    _couponLabel(index) {
      const item = this.couponColumns.find(item => item.value === this.formData.give[index].goods)
      return item ? item.label : ''
    },
    // 会员卡详情
    _readMemberGroupDetail(id) {
      this.readMemberGroupDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
      })
    },
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
        const params = JSON.parse(JSON.stringify(this.formData))
        const { id } = this.$route.params
        let method = 'createMemberGroup'
        if (id) {
          method = 'updateMemberGroup'
          params.gid = id
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
