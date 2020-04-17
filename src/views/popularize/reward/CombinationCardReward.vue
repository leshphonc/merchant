<template>
  <div>
    <van-nav-bar
      @click-left="$goBack"
      @click-right="_submit"
      fixed
      left-arrow
      right-text="保存"
      title="推广分佣设置"
    ></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group title="分销设置">
        <van-cell title="发布到分销市场">
          <van-switch active-value="1" inactive-value="0" v-model="formData.is_fx" />
        </van-cell>
        <div v-if="formData.is_fx === '1'">
          <van-field
            :value="typeLabel"
            @click="_controlTypePicker"
            input-align="right"
            is-link
            label="分润类型"
            readonly
          />
          <ValidationProvider name="分润金额" rules="required|decimal-max2" slim v-slot="{ errors }">
            <van-field
              :error-message="errors[0]"
              label="分润金额"
              placeholder="最多支持2位小数"
              required
              type="number"
              v-model.trim="formData.fx_money"
            />
          </ValidationProvider>
        </div>
      </van-cell-group>
      <van-cell-group title="购买者赠送" v-if="formData.is_fx === '1'">
        <ValidationProvider
          :name="`购买者赠送${$getGlobal('dhb_alias')}`"
          rules="required|numeric"
          slim
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label="`${$getGlobal('dhb_alias')}`"
            placeholder="请填写赠送数量"
            required
            type="number"
            v-model.trim="formData.fx_buyer_dhb"
          />
        </ValidationProvider>
        <ValidationProvider
          :name="`购买者赠送${$getGlobal('score_alias')}`"
          rules="required|numeric"
          slim
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label="`${$getGlobal('score_alias')}`"
            placeholder="请填写赠送数量"
            required
            type="number"
            v-model.trim="formData.fx_buyer_score"
          />
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="销售者获得" v-if="formData.is_fx === '1'">
        <ValidationProvider
          :name="`销售者获得${$getGlobal('dhb_alias')}`"
          rules="required|numeric"
          slim
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label="`${$getGlobal('dhb_alias')}`"
            placeholder="请填写获得数量"
            required
            type="number"
            v-model.trim="formData.fx_seller_dhb"
          />
        </ValidationProvider>
        <ValidationProvider
          :name="`销售者获得${$getGlobal('score_alias')}`"
          rules="required|numeric"
          slim
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label="`${$getGlobal('score_alias')}`"
            placeholder="请填写获得数量"
            required
            type="number"
            v-model.trim="formData.fx_seller_score"
          />
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="分佣设置">
        <van-cell title="等级会员分佣">
          <van-switch active-value="1" inactive-value="0" v-model="formData.level_set" />
        </van-cell>
      </van-cell-group>
      <div v-if="formData.level_set === '1'">
        <van-cell-group :key="index" :title="item.name" v-for="(item, index) in formData.spread">
          <van-field
            :label-width="resizeWidth"
            label="销售佣金比例"
            placeholder="佣金比例"
            type="number"
            v-model.trim="item.spread_sale"
          >
            <div slot="right-icon">%</div>
          </van-field>
          <van-field
            :label-width="resizeWidth"
            label="推广佣金比例1"
            placeholder="佣金比例"
            type="number"
            v-model.trim="item.spread_rate"
          >
            <div slot="right-icon">%</div>
          </van-field>
          <van-field
            :label-width="resizeWidth"
            label="推广佣金比例2"
            placeholder="佣金比例"
            type="number"
            v-if="item.sub_spread_rate && $getGlobal('open_spread') === '1'"
            v-model.trim="item.sub_spread_rate"
          >
            <div slot="right-icon">%</div>
          </van-field>
          <van-field
            :label-width="resizeWidth"
            label="推广佣金比例3"
            placeholder="佣金比例"
            type="number"
            v-if="item.third_spread_rate && $getGlobal('open_spread') === '1'"
            v-model.trim="item.third_spread_rate"
          >
            <div slot="right-icon">%</div>
          </van-field>
        </van-cell-group>
      </div>
    </ValidationObserver>
    <!-- 弹出层 -->
    <!-- 分销类型 -->
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'CombinationCardReward',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        is_fx: '0',
        fx_type: '0',
        fx_money: '',
        fx_buyer_dhb: '',
        fx_buyer_score: '',
        fx_seller_dhb: '',
        fx_seller_score: '',
        level_set: '0',
        spread: [],
      },
      typeColumns: [
        {
          label: '固定金额',
          value: '0',
        },
        {
          label: '售价百分比',
          value: '1',
        },
      ],
      showTypePicker: false,
      loading: false,
    }
  },

  computed: {
    typeLabel() {
      const item = this.typeColumns.find(item => item.value === this.formData.fx_type)
      return item && item.label
    },
    typeIndex() {
      const index = this.typeColumns.findIndex(item => item.value === this.formData.fx_type)
      return index
    },
    // 自适应120宽度
    resizeWidth() {
      return (120 / 375) * document.body.clientWidth + 'px'
    },
  },

  watch: {},

  created() {},

  async mounted() {
    await this.getUserLevel().then(res => {
      const spread = res.map(item => {
        const obj = {
          level: item.id,
          name: item.name,
          spread_sale: '',
          spread_rate: '',
        }
        if (this.$getGlobal('show_three') === '1') {
          obj.sub_spread_rate = ''
          obj.third_spread_rate = ''
        }
        return obj
      })
      this.formData.spread = spread
    })
    const { id } = this.$route.params
    await this.readCombinationCardDetail(id).then(res => {
      const keys = Object.keys(this.formData)
      keys.forEach(item => {
        if (item === 'spread') return
        this.formData[item] = res[0][item]
      })
      this.formData.level_set = res[0].level_set
      if (res[0].level_set === '1' && res[0].spread.length !== 0) {
        this.formData.spread = res[0].spread
        res[0].spread.forEach((item, index) => {
          this.formData.spread[index].spread_sale = item.spread_sale
          this.formData.spread[index].spread_rate = item.spread_rate
          item.sub_spread_rate && (this.formData.spread[index].sub_spread_rate = item.sub_spread_rate)
          item.third_spread_rate && (this.formData.spread[index].third_spread_rate = item.third_spread_rate)
        })
      }
    })
  },

  destroyed() {},

  methods: {
    ...mapActions(['getUserLevel']),
    ...mapActions('reward', ['updateCombinationCardReward']),
    ...mapActions('commodity', ['readCombinationCardDetail']),
    _controlTypePicker() {
      this.showTypePicker = !this.showTypePicker
    },
    _pickType(data) {
      this.formData.fx_type = data.value
      this._controlTypePicker()
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
        const { id } = this.$route.params
        const params = JSON.parse(JSON.stringify(this.formData))
        params.meal_id = id
        this.updateCombinationCardReward(params)
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
