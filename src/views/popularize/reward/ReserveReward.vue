<template>
  <div>
    <van-nav-bar @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存" title="佣金分销设置"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
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
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'eCommerceReward',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        level_set: '0',
        spread: [],
      },
      loading: false,
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
    await this.readReserveDetail(id).then(res => {
      this.formData.level_set = res.appoint_list.level_set
      if (res.appoint_list.level_set === '1' && res.appoint_list.spread.length !== 0) {
        this.formData.spread = res.appoint_list.spread
      }
    })
  },

  destroyed() {},

  methods: {
    ...mapActions(['getUserLevel']),
    ...mapActions('reward', ['updateReserveReward']),
    ...mapActions('commodity', ['readReserveDetail']),
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
        params.appoint_id = id
        this.updateReserveReward(params)
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
