<template>
  <div>
    <van-nav-bar @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存" title="预定商品优惠"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group title="基础设置">
        <van-field input-align="right" label="选择车型">
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.is_select_car_model" />
        </van-field>
        <van-field input-align="right" label="输入车牌">
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.is_select_car_license" />
        </van-field>
        <van-field input-align="right" label="显示服务者">
          <van-switch active-value="1" inactive-value="0" slot="input" v-model="formData.is_select_workerstaff" />
        </van-field>
      </van-cell-group>
      <van-cell-group title="用户消费赠送比例" v-if="$getGlobal('dhb_open') !== 0 || $getGlobal('score_open') !== 0">
        <ValidationProvider
          :name="`赠送${$getGlobal('score_alias')}数量`"
          rules="required|numeric"
          slim
          v-if="$getGlobal('dhb_open') !== 0"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            :placeholder="`赠送${$getGlobal('score_alias')}数量`"
            label="每消费1元赠送"
            v-model="formData.dhb_get_num"
          >
            <div slot="right-icon">{{ $getGlobal('score_alias') }}</div>
          </van-field>
        </ValidationProvider>
        <ValidationProvider
          :name="`赠送${$getGlobal('dhb_alias')}数量`"
          rules="required|numeric"
          slim
          v-if="$getGlobal('score_open') !== 0"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            :placeholder="`赠送${$getGlobal('dhb_alias')}数量`"
            label="每消费1元赠送"
            v-model="formData.score_get_num"
          >
            <div slot="right-icon">{{ $getGlobal('dhb_alias') }}</div>
          </van-field>
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="环境配置">
        <ValidationProvider name="环境专区名称" rules="required" slim v-slot="{ errors }">
          <van-field
            :label-width="resizeWidth"
            label="环境专区名称"
            placeholder="请填写环境专区名称"
            v-model="formData.envo_area_name"
          ></van-field>
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
    <div class="white-space"></div>
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
        is_select_car_model: '0',
        is_select_car_license: '0',
        is_select_workerstaff: '0',
        envo_area_name: '',
      },
    }
  },

  computed: {
    // 自适应120宽度
    resizeWidth() {
      return (120 / 375) * document.body.clientWidth + 'px'
    },
  },

  watch: {},

  created() {},

  mounted() {
    // 商家信息   用来判断是否开启兑换币
    this.readMerchantInfo()
    // 优惠详情
    const id = this.$route.params.id
    id && this._readECommerceCommodityDetail(id)
  },

  destroyed() {},

  methods: {
    ...mapActions('basicInformation', ['readMerchantInfo']),
    ...mapActions('commodity', ['updateECommerceCommodityPreferential', 'readECommerceCommodityDetail']),

    // 页面默认数据
    _readECommerceCommodityDetail(id) {
      this.readECommerceCommodityDetail(id).then(res => {
        const keys = Object.keys(this.formData)
        keys.forEach(item => {
          this.formData[item] = res[item]
        })
      })
    },
    async _submit() {
      console.log(this.formData)
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
        params.goods_id = this.$route.params.id
        params.store_id = 0
        params.seckill_open_time = this.startTimeLabel
        params.seckill_close_time = this.endTimeLabel
        // 表单完整，进行数据修改并提交
        this.updateECommerceCommodityPreferential(params)
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
