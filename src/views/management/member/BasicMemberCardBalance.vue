<template>
  <div>
    <van-nav-bar @click-left="$goBack" @click-right="_submit" fixed left-arrow right-text="保存" title="商家会员卡余额管理"></van-nav-bar>
    <div class="nav-bar-holder"></div>
    <ValidationObserver ref="observer" slim v-slot="{ invalid }">
      <van-cell-group title="基础信息">
        <ValidationProvider name="初始余额" rules="required|decimal-max2" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('领会员卡时自动向该卡赠送金额')"
            label="会员卡初始余额"
            placeholder="最多支持2位小数"
            required
            right-icon="question-o"
            type="number"
            v-model.trim="formData.begin_money"
          />
        </ValidationProvider>
        <ValidationProvider name="充值建议" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('用户可以在充值页面快速点击充值该建议金额。英文逗号隔开，如10,20,30')"
            label="充值金额建议"
            placeholder="请填写充值金额建议"
            required
            right-icon="question-o"
            type="number"
            v-model.trim="formData.recharge_suggest"
          />
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="积分">
        <ValidationProvider name="初始积分" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('领会员卡时自动向该卡赠送金额')"
            label="会员卡初始积分"
            placeholder="初始积分"
            required
            right-icon="question-o"
            type="number"
            v-model.trim="formData.begin_score"
          />
        </ValidationProvider>
        <van-cell title="消费获得积分">
          <van-switch active-value="1" inactive-value="0" v-model="formData.support_score_select"></van-switch>
        </van-cell>
        <ValidationProvider
          name="获得积分"
          rules="required|numeric"
          slim
          v-if="formData.support_score_select === '1'"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('用户每消费一元获得的积分数，大于1的整数')"
            label="消费一元获得"
            placeholder="请填写消费1元获得的积分数"
            required
            right-icon="question-o"
            type="number"
            v-model.trim="formData.support_score"
          />
        </ValidationProvider>
        <van-cell title="会员签到送积分">
          <van-switch active-value="1" inactive-value="0" v-model="formData.sign_open"></van-switch>
        </van-cell>
        <ValidationProvider
          name="签到送积分"
          rules="required|numeric"
          slim
          v-if="formData.sign_open === '1'"
          v-slot="{ errors }"
        >
          <van-field
            :error-message="errors[0]"
            :label-width="resizeWidth"
            @click-right-icon="$toast('用户每次签到获取的积分，非负的整数，0表示不给积分')"
            label="签到送积分"
            placeholder="每次签到送积分"
            required
            right-icon="question-o"
            type="number"
            v-model.trim="formData.sign_score"
          />
        </ValidationProvider>
      </van-cell-group>
      <van-cell-group title="充值返现规则">
        <van-button @click="_addRule" class="add-rule" icon="plus">新增</van-button>
      </van-cell-group>
      <van-cell-group :key="index" v-for="(item, index) in formData.rules">
        <div slot="title">
          {{ `规则${index + 1}` }}
          <van-button @click="_deleteRule(index)" class="delete-rule" size="small" type="danger">删除</van-button>
        </div>
        <ValidationProvider :name="`充值金额${index + 1}`" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="充值"
            placeholder="正整数"
            required
            type="number"
            v-model.trim="item.recharge_count"
          />
        </ValidationProvider>
        <ValidationProvider :name="`返现金额${index + 1}`" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="返现"
            placeholder="正整数"
            required
            type="number"
            v-model.trim="item.recharge_back_money"
          />
        </ValidationProvider>
        <ValidationProvider :name="`返金币${index + 1}`" rules="required|numeric" slim v-slot="{ errors }">
          <van-field
            :error-message="errors[0]"
            label="返金币"
            placeholder="正整数"
            required
            type="number"
            v-model.trim="item.recharge_back_score"
          />
        </ValidationProvider>
      </van-cell-group>
    </ValidationObserver>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'basicMemberCardBalance',

  mixins: [],

  components: {},

  props: {},

  data() {
    return {
      formData: {
        begin_money: '',
        recharge_suggest: '',
        begin_score: '',
        support_score_select: '0',
        support_score: '',
        sign_open: '0',
        sign_score: '',
        rules: [],
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

  mounted() {
    this.getBasicMemberCard().then(res => {
      console.log(res)
      const keys = Object.keys(this.formData)
      keys.forEach(item => {
        this.formData[item] = res.card[item]
      })
      this.formData.rules = res.rule_list
    })
  },

  destroyed() {},

  methods: {
    ...mapActions('member', ['getBasicMemberCard', 'updateBasicMemberCardBalance']),
    _addRule() {
      this.formData.rules.push({
        id: '0',
        recharge_count: '',
        recharge_back_money: '',
        recharge_back_score: '',
      })
    },
    _deleteRule(index) {
      this.formData.rules.splice(index, 1)
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
        this.loading = true
        const params = JSON.parse(JSON.stringify(this.formData))
        this.updateBasicMemberCardBalance(params)
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
.add-rule {
  width: 100%;
}

.delete-rule {
  margin-left: 10px;
}
</style>
